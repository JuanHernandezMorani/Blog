const { Router } = require("express");
const { Post, Section, Content } = require("../db.js");
const { v2: cloudinary } = require('cloudinary');
const { getPostsData } = require("../middleware/PostMiddleware.js");
const { conn } = require('../db.js');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});

const node_env = process.env.NODE_ENV;

const app = Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function parseJSONFields(data, fields) {
    fields.forEach(field => {
        if (typeof data[field] === 'string' && /^[\[{]/.test(data[field])) {
            try {
                data[field] = JSON.parse(data[field]);
            } catch (error) {
                console.warn(`No se pudo parsear el campo "${field}":`, error);
            }
        }
    });
    return data;
}

app.get('/', async (req, res) => {
    try {
        const exist = await Post.findOne();
        if (!exist && node_env === "dev") {
            await getPostsData();
        }

        let allPosts = await Post.findAll();

        allPosts = allPosts.map(post => parseJSONFields(post.toJSON(), ['collaborators']));

        return res.status(200).json(allPosts);
    } catch (error) {
        console.error("Error al obtener los posts: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let post = await Post.findOne({
            where: { id: id },
            include: [
                {
                    model: Section,
                    as: 'sections',
                    include: [
                        {
                            model: Content,
                            as: 'contents'
                        }
                    ]
                }
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Section, as: 'sections' }, 'order', 'ASC'],
                [{ model: Section, as: 'sections' }, { model: Content, as: 'contents' }, 'order', 'ASC']
            ]
        });

        if (post) {
            post = parseJSONFields(post.toJSON(), ['collaborators']);

            post.sections.forEach(section => {
                section.contents.forEach(content => {
                    parseJSONFields(content, ['data']);
                });
            });

            return res.status(200).send(post);
        } else {
            return res.status(404).send(`Error 404: Can't find post with id: ${id}`);
        }
    } catch (error) {
        console.error(`Error al obtener el post: ${id}, error: `, error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.put('/:id', async (req, res) => {
    const t = await conn.transaction();
    try {
        const { id } = req.params;
        const { title, coverImage, backgroundColor, collaborators, status, sections } = req.body;
        var coSrc = Array.isArray(collaborators) ? JSON.stringify(collaborators) : collaborators;

        let post = await Post.findOne({
            where: { id },
            include: [
                {
                    model: Section,
                    as: 'sections',
                    include: [
                        {
                            model: Content,
                            as: 'contents'
                        }
                    ]
                }
            ],
            order: [
                ['id', 'ASC'],
                [{ model: Section, as: 'sections' }, 'order', 'ASC'],
                [{ model: Section, as: 'sections' }, { model: Content, as: 'contents' }, 'order', 'ASC']
            ]
        });

        if (!post) {
            return res.status(404).send(`Error 404: Can't find post with id: ${id}`);
        }

        await post.update({ title, coverImage, backgroundColor, coSrc, status }, { transaction: t });

        const existingSectionIds = post.sections.map(s => s.id);
        const updatedSectionIds = sections.map(s => s.id).filter(id => id !== undefined);

        const sectionsToDelete = existingSectionIds.filter(id => !updatedSectionIds.includes(id));
        await Section.destroy({ where: { id: sectionsToDelete }, transaction: t });

        for (const section of sections) {
            let updatedSection;

            if (section.id) {
                updatedSection = await Section.findOne({ where: { id: section.id }, transaction: t });
                if (updatedSection) {
                    await updatedSection.update(
                        { subtitle: section.subtitle, order: section.order },
                        { transaction: t }
                    );
                }
            } 
            else {
                updatedSection = await Section.create(
                    { subtitle: section.subtitle, order: section.order, postId: post.id },
                    { transaction: t }
                );
            }

            const existingContentIds = updatedSection.contents?.map(c => c.id) || [];
            const updatedContentIds = section.contents.map(c => c.id).filter(id => id !== undefined);

            const contentsToDelete = existingContentIds.filter(id => !updatedContentIds.includes(id));
            await Content.destroy({ where: { id: contentsToDelete }, transaction: t });

            for (const content of section.contents) {
                if (content.id) {
                    await Content.update(
                        {
                            type: content.type,
                            data: Array.isArray(content.data) ? JSON.stringify(content.data) : content.data,
                            order: content.order
                        },
                        { where: { id: content.id }, transaction: t }
                    );
                } 
                else {
                    await Content.create(
                        {
                            type: content.type,
                            data: Array.isArray(content.data) ? JSON.stringify(content.data) : content.data,
                            order: content.order,
                            sectionId: updatedSection.id
                        },
                        { transaction: t }
                    );
                }
            }
        }

        await t.commit();
        return res.status(200).json({ message: "Post actualizado exitosamente" });

    } catch (error) {
        await t.rollback();
        console.error("Error al actualizar el post:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.post('/', async (req, res) => {
    const t = await conn.transaction();
    try {
        const { title, coverImage, backgroundColor, fontColor,collaborators, status, sections } = req.body;
        const collaboratorsData = Array.isArray(collaborators) ? JSON.stringify(collaborators) : collaborators;

        if (!title || !status || !sections || !Array.isArray(sections)) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const newPost = await Post.create(
            { title, coverImage, backgroundColor, fontColor,collaborators: collaboratorsData, status },
            { transaction: t }
        );

        for (const section of sections) {
            const newSection = await Section.create(
                {
                    subtitle: section.subtitle,
                    order: section.order,
                    postId: newPost.id
                },
                { transaction: t }
            );

            for (const content of section.contents) {
                await Content.create(
                    {
                        type: content.type,
                        data: Array.isArray(content.data) ? JSON.stringify(content.data) : content.data,
                        order: content.order,
                        isSubtitle: content.isSubtitle,
                        sectionId: newSection.id
                    },
                    { transaction: t }
                );
            }
        }

        await t.commit();
        return res.status(201).json({ message: "Post creado con éxito", postId: newPost.id });

    } catch (error) {
        await t.rollback();
        console.error("Error al crear el post: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
    let postFind = Post.findOne({where: {id: id}})
    if(postFind){
        await Post.destroy({
            where: { id: id },
        });
        res.status(200).send({ message: 'Deleting post' });
    } else {
        res.status(412).send({ message: 'Error 412: cant delete post' });
    }
    } catch (error) {
        console.error("Error al eliminar el post: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    
});

app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No se recibió ninguna imagen' });
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'uploads',
            resource_type: 'image'
        });

        res.json({ imageUrl: uploadResponse.secure_url });
    } catch (error) {
        console.error('Error al subir imagen a Cloudinary:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
});

module.exports = app;