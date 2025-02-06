const { Post, Section, Content } = require("../db.js");

const getPostsData = async () => {
        try{
            let examplePost = await Post.create({
                title: "Guía de calendarios de contenidos (+ plantillas gratuitas para crear uno)",
                coverImage: "https://static.semrush.com/blog/uploads/media/63/66/6366a1ee2489c6454ac725890777071b/create-content-calendar.svg",
                backgroundColor: "#ffe84d",
                collaborators: "Dev",
                status: "published",
            });
            
            let exampleSection1 = await Section.create({
                subtitle: "¿Qué es un calendario de contenidos?",
                order: 1,
                postId: examplePost.id,
            });
            
            await Content.create({
                type: 'paragraph',
                data: 'Un calendario de contenidos (también llamado calendario editorial) es una programación de cuándo y dónde publicarás tus próximos contenidos. Te ayuda a gestionar tu proceso de creación y publicación de contenidos.',
                order: 1,
                sectionId: exampleSection1.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Puedes utilizar un calendario de contenidos para el contenido del blog, las publicaciones en las redes sociales, las campañas de correo electrónico, los vídeos y mucho más.',
                order: 2,
                sectionId: exampleSection1.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Y también podría incluir campos para:',
                order: 3,
                sectionId: exampleSection1.id,
            });
            await Content.create({
                type: 'list',
                data: JSON.stringify(['Título', 'Fechas de publicación', 'Miembros del equipo implicados', 'Estados']),
                order: 4,
                sectionId: exampleSection1.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'He aquí un ejemplo de lo que podría ser un calendario de contenidos básico:',
                order: 5,
                sectionId: exampleSection1.id,
            });
            await Content.create({
                type: 'image',
                data: 'https://static.semrush.com/blog/uploads/media/81/7e/817e37ae40180fb6aa19f0330f059466/8f043970c7791a0cfbf665a3bd3797f7/AD_4nXd2z4sOvyN7qhTSyB4q2KkXHwlcPr868yc5z7BgpaibRGdLhkrHVG5vOesZrraoY0r1Hwfdsh_ieZBlm4brCtPSgurQWpu8xi4SMrsXjOxMpdPa4pTW4fnfJbqPY620MJZY9U-KTz4YGJN4lDBrrVjYuTxf.jpeg',
                order: 6,
                sectionId: exampleSection1.id,
            });

            let exampleSection2 = await Section.create({
                subtitle: "Las mejores herramientas de calendario de contenidos (+ plantillas)",
                order: 2,
                postId: examplePost.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Aquí tienes nuestras herramientas de calendario de contenidos favoritas, ordenadas por tamaño de empresa:',
                order: 1,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Para vendedores en solitario o pequeños equipos con presupuestos limitados:',
                order: 2,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'list',
                data: JSON.stringify(['Hojas de Google (puedes utilizar nuestra plantilla de calendario)','Calendario editorial de WordPress']),
                order: 3,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Para grandes empresas con un equipo de creadores de contenidos:',
                order: 4,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'list',
                data: JSON.stringify(['Trello (viene con una plantilla)','Noción (viene con una plantilla)','Asana (viene con una plantilla)']),
                order: 5,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Repasemos cada uno de ellos.',
                order: 6,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Hojas de cálculo de Google',
                isSubtitle: true,
                order: 7,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Calendario editorial de WordPress',
                isSubtitle: true,
                order: 8,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Trello',
                isSubtitle: true,
                order: 9,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Noción',
                isSubtitle: true,
                order: 10,
                sectionId: exampleSection2.id,
            });
            await Content.create({
                type: 'paragraph',
                data: 'Asana',
                isSubtitle: true,
                order: 11,
                sectionId: exampleSection2.id,
            });

        } 
        catch (error) {
            console.error("Error al crear el post:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
}

module.exports = {
    getPostsData,
}