import '../styles/form.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import PreviewPost from './previewPost.jsx';
import { getPostById, createPost, clearImageSuccess, uploadImage, updatePost, sendNewsletter } from '../actions';
import Swal from 'sweetalert2';

function validate(post) {
    const errors = {};
    if (!post.title) errors.title = 'El nombre es obligatorio.';
    if (post.title.length < 3) errors.title = 'El nombre debe tener mínimo 3 caracteres.';
    if (post.sections.length < 1) errors.sections = 'Las secciones no pueden estar vacías.';
    if (post.backgroundColor.length !== 7) errors.backgroundColor = 'Formato no válido. Usa código HEX (ejemplo: #ffffff).';
    return errors;
}

export default function Form({ postId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const postToEdit = postId || id;

    const [postData, setPostData] = useState({
        title: 'undefined',
        coverImage: 'undefined',
        backgroundColor: '#ffffff',
        fontColor: '#000000',
        collaborators: [],
        status: 'published',
        sections: [{ subtitle: 'undefined', order: 1, contents: [] }]
    });

    const [openSections, setOpenSections] = useState(
        Object.fromEntries(postData.sections.map((_, index) => [index, true]))
    );

    const [openContents, setOpenContents] = useState(
        Object.fromEntries(
            postData.sections.flatMap((section, sectionIndex) =>
                section.contents.map((_, contentIndex) => [`${sectionIndex}-${contentIndex}`, true])
            )
        )
    );

    const toggleSection = (sectionIndex, e) => {
        e.preventDefault();
        setOpenSections(prevState => ({
            ...prevState,
            [sectionIndex]: !prevState[sectionIndex],
        }));
    };

    const toggleContent = (sectionIndex, contentIndex, e) => {
        e.preventDefault();
        setOpenContents(prevState => ({
            ...prevState,
            [`${sectionIndex}-${contentIndex}`]: !prevState[`${sectionIndex}-${contentIndex}`],
        }));
    };

    const details = useSelector(state => state.Details);
    const uploadedImages = useSelector(state => state.uploadedImages);

    useEffect(() => {
        if (uploadedImages.coverImage) {
            setPostData(prev => ({ ...prev, coverImage: uploadedImages.coverImage }));
        }
    }, [uploadedImages.coverImage]);

    useEffect(() => {
        if (uploadedImages.contentImages) {
            setPostData(prev => {
                const newData = {
                    ...prev,
                    sections: prev.sections.map(section => ({
                        ...section,
                        contents: section.contents.map(content => ({ ...content }))
                    }))
                };

                Object.keys(uploadedImages.contentImages).forEach((key) => {
                    let [sectionIndex, contentIndex] = key.split(",").map(Number);

                    if (newData.sections[sectionIndex]?.contents[contentIndex]) {
                        newData.sections[sectionIndex].contents[contentIndex] = {
                            ...newData.sections[sectionIndex].contents[contentIndex],
                            data: uploadedImages.contentImages[key]
                        };
                    }
                });

                return newData;
            });
        }
    }, [uploadedImages.contentImages]);

    useEffect(() => {
        if (postToEdit) {
            dispatch(getPostById(postToEdit));
        }
    }, [postToEdit, dispatch]);

    useEffect(() => {
        if (postToEdit && details) {
            setPostData(details);

            setOpenSections(
                Object.fromEntries(details.sections.map((_, index) => [index, true]))
            );

            setOpenContents(
                Object.fromEntries(
                    details.sections.flatMap((section, sectionIndex) =>
                        section.contents.map((_, contentIndex) => [`${sectionIndex}-${contentIndex}`, true])
                    )
                )
            );
        }
    }, [details, postToEdit]);

    const handleCoverImageUpload = (e) => {
        const file = e.target.files[0];
        dispatch(uploadImage(file, "coverImage"));
    };

    const handleContentImageUpload = (index, contentIndex, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const location = `${index},${contentIndex}`;
        dispatch(uploadImage(file, "contentImage", location));
    };

    function handleChange(e) {
        setPostData({ ...postData, [e.target.name]: e.target.value });
        setErrors(validate({ ...postData, [e.target.name]: e.target.value }));
    }

    function handleAddSection() {
        const newSection = { subtitle: '', order: postData.sections.length + 1, contents: [] };
        setPostData({ ...postData, sections: [...postData.sections, newSection] });
    }

    function handleSectionChange(index, e) {
        const sections = [...postData.sections];
        sections[index][e.target.name] = e.target.value;
        setPostData({ ...postData, sections });
    }

    function handleDeleteSection(index) {
        const sections = [...postData.sections];
        sections.splice(index, 1);
        setPostData({ ...postData, sections });
    }

    function handleSectionOrderChange(index, e) {
        const sections = [...postData.sections];
        if (e.target.value < 0 || e.target.value > (sections.length - 1)) {
            return e.target.value = index;
        }
        if (sections[e.target.value] === undefined || sections[e.target.value] === null) {
            sections[e.target.value] = sections[index];
            sections.splice(index, 1);
            setPostData({ ...postData, sections });
        }
        else {
            var aux = sections[index];
            sections[index] = sections[e.target.value];
            sections[e.target.value] = aux;
            setPostData({ ...postData, sections });
        }
    }

    function handleAddContent(sectionIndex) {
        const sections = [...postData.sections];
        sections[sectionIndex].contents.push({
            type: 'paragraph',
            data: '',
            order: sections[sectionIndex].contents.length + 1
        });
        setPostData({ ...postData, sections });
    }

    function handleDeleteContent(sectionIndex, contentIndex) {
        const sections = [...postData.sections];
        sections[sectionIndex].contents.splice(contentIndex, 1);
        setPostData({ ...postData, sections });
    }

    function handleContentChange(sectionIndex, contentIndex, e) {
        const { name, value } = e.target;
        setPostData((prevState) => {
            const sections = [...prevState.sections];
            const content = { ...sections[sectionIndex].contents[contentIndex], [name]: value };
            if (name === "type") {
                content.data = value === "list" ? [] : "";
            }

            sections[sectionIndex].contents[contentIndex] = content;
            return { ...prevState, sections };
        });
    }

    function handleAddListItem(sectionIndex, contentIndex) {
        const sections = [...postData.sections];
        sections[sectionIndex].contents[contentIndex].data.push('');
        setPostData({ ...postData, sections });
    }

    function handleRemoveListItem(sectionIndex, contentIndex, itemIndex) {
        const sections = [...postData.sections];
        sections[sectionIndex].contents[contentIndex].data.splice(itemIndex, 1);
        setPostData({ ...postData, sections });
    }

    function handleListItemChange(sectionIndex, contentIndex, itemIndex, e) {
        const sections = [...postData.sections];
        sections[sectionIndex].contents[contentIndex].data[itemIndex] = e.target.value;
        setPostData({ ...postData, sections });
    }

    function handleAddCollaborator() {
        setPostData((prevState) => ({
            ...prevState,
            collaborators: [...prevState.collaborators, ""],
        }));
    }

    function handleRemoveCollaborator(index) {
        setPostData((prevState) => {
            const newCollaborators = [...prevState.collaborators];
            newCollaborators.splice(index, 1);
            return { ...prevState, collaborators: newCollaborators };
        });
    }

    function handleCollaboratorChange(index, e) {
        setPostData((prevState) => {
            const newCollaborators = [...prevState.collaborators];
            newCollaborators[index] = e.target.value;
            return { ...prevState, collaborators: newCollaborators };
        });
    }

    function handleCollabOrderChange(index, e) {
        const collaborators = [...postData.collaborators];
        if (e.target.value < 0 || e.target.value > (collaborators.length - 1)) {
            return e.target.value = index;
        }
        if (collaborators[e.target.value] === undefined || collaborators[e.target.value] === null) {
            collaborators[e.target.value] = collaborators[index];
            collaborators.splice(index, 1);
            setPostData({ ...postData, collaborators });
        }
        else {
            var aux = collaborators[index];
            collaborators[index] = collaborators[e.target.value];
            collaborators[e.target.value] = aux;
            setPostData({ ...postData, collaborators });
        }

    }

    function handleContentOrderChange(index, contentIndex, e) {
        const sections = [...postData.sections];
        const contents = sections[index].contents;
        if (e.target.value < 0 || e.target.value > (contents.length - 1)) {
            return e.target.value = index;
        }
        if (contents[e.target.value] === undefined || contents[e.target.value] === null) {
            contents[e.target.value] = contents[contentIndex];
            contents.splice(contentIndex, 1);
            setPostData({ ...postData, sections });
        }
        else {
            var aux = contents[contentIndex];
            contents[contentIndex] = contents[e.target.value];
            contents[e.target.value] = aux;
            setPostData({ ...postData, sections });
        }
    }

    function handleListOrderChange(index, contentIndex, itemIndex, e) {
        const sections = [...postData.sections];
        const contents = sections[index].contents;
        const content = contents[contentIndex];
        const list = content.data;
        if (e.target.value < 0 || e.target.value > (list.length - 1)) {
            return e.target.value = index;
        }
        if (list[e.target.value] === undefined || list[e.target.value] === null) {
            list[e.target.value] = list[itemIndex];
            list.splice(itemIndex, 1);
            setPostData({ ...postData, sections });
        }
        else {
            var aux = list[itemIndex];
            list[itemIndex] = list[e.target.value];
            list[e.target.value] = aux;
            setPostData({ ...postData, sections });
        }
    }

    function handleIsSubtitleChange(index, contentIndex, e) {
        const sections = [...postData.sections];
        const content = { ...sections[index].contents[contentIndex], isSubtitle: e.target.checked };
        setPostData((prevState) => {
            sections[index].contents[contentIndex] = content;
            return { ...prevState, sections };
        });
    }

    document.querySelectorAll("textarea").forEach(textarea => {
        if (textarea.id) {
            const adjustHeight = () => {
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
            };

            textarea.addEventListener("input", adjustHeight);
            adjustHeight();
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        let errors = validate(postData);
        if (!errors.title && !errors.sections) {
            if (!!postToEdit) dispatch(updatePost(postToEdit, postData));
            else {
                dispatch(createPost(postData));
                dispatch(sendNewsletter(postData.title));
            };

            dispatch(clearImageSuccess());
            Swal.fire({
                icon: 'success',
                title: 'Post creado con éxito',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            }).then(() => navigate('/'));
        }
    }

    return (
        <div className='creation-form-container'>
            <div className='creation-form-component'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <div className='upper-form'>
                        {postToEdit ? <button type='submit' className='create-button'>Guardar Post</button> : <button type='submit' className='create-button'>Crear Post</button>}
                        <div>
                            <h3>Título</h3>
                            <textarea type="text" value={postData.title} name='title' placeholder='Ingrese titulo...' onChange={handleChange} className='input-form' />
                            {errors.title && <p className='input-errors'>{errors.title}</p>}
                        </div>
                        <div className='form-colors'>
                            <h3>Color de letra {'(' + postData.fontColor + ')'}</h3>
                            <input type='color' name='fontColor' value={postData.fontColor} onChange={handleChange} className='input-color' />
                            <h3>Color de fondo {'(' + postData.backgroundColor + ')'}</h3>
                            <input type='color' name='backgroundColor' value={postData.backgroundColor} onChange={handleChange} className='input-color' />
                        </div>
                        <div>
                            <h3>Imagen de portada</h3>
                            <input type='file' accept='image/*' onChange={handleCoverImageUpload} className='input-form' />
                        </div>
                        <div>
                            <h3>Colaboradores</h3>
                            <select onChange={(e) => setPostData({ ...postData, collaborators: e.target.value === "single" ? "" : [] })} className='input-text'>
                                <option value="single">Un colaborador</option>
                                <option value="multiple">Varios colaboradores</option>
                            </select>

                            {Array.isArray(postData.collaborators) ? (
                                <>
                                    <button type="button" onClick={handleAddCollaborator}>Agregar colaborador</button>
                                    {postData.collaborators.map((collab, index) => (
                                        <div key={index}>
                                            <input type="text" value={collab} onChange={(e) => handleCollaboratorChange(index, e)} placeholder={`Colaborador ${index + 1}`} className='input-text' />
                                            <input type='number' name='collab-order' value={index} onChange={(e) => handleCollabOrderChange(index, e)} min='0' className='order-input' />
                                            <button type="button" onClick={() => handleRemoveCollaborator(index)} className='content-button'>Eliminar</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <input
                                    type="text"
                                    name="collaborators"
                                    value={postData.collaborators}
                                    onChange={(e) => setPostData({ ...postData, collaborators: e.target.value })}
                                    placeholder="Nombre del colaborador"
                                    className='input-text-c'
                                />
                            )}
                        </div>
                        <h3>Secciones</h3><button type='button' className='create-button' onClick={handleAddSection}>Agregar sección</button>
                    </div>
                    <div className='form-sections'>
                        {postData.sections.map((section, index) => (
                            <div key={index} className='create-section'>
                                <div className='inner-section'>
                                    <div>
                                        <button type="button" onClick={(e) => toggleSection(index, e)} className="toggle-button">
                                            {openSections[index] ? "▲ Cerrar Sección" : "▼ Abrir Sección"}
                                        </button>
                                        <button type='button' onClick={() => handleAddContent(index)} className='content-button'>
                                            Agregar contenido
                                        </button>
                                        <input type='number' name='section-order' value={index} onChange={(e) => handleSectionOrderChange(index, e)} min='0' className='order-input' />
                                    </div>
                                    <textarea type='text' name='subtitle' value={section.subtitle} placeholder='Subtítulo' onChange={(e) => handleSectionChange(index, e)} id={'section-' + index} className='input-text-2' />
                                </div>
                                {index > 0 && (
                                    <button type='button' onClick={() => handleDeleteSection(index)} className='content-button'>
                                        Eliminar Sección
                                    </button>
                                )}

                                {openSections[index] && (
                                    <div className="section-contents">
                                        {section.contents.map((content, contentIndex) => (
                                            <div className='content-w-toggle'>
                                                <div className='inner-content-w-toggle'>
                                                    <button onClick={(e) => toggleContent(index, contentIndex, e)} className='toggle-button'>
                                                        {openContents[`${index}-${contentIndex}`] ? "▲ Cerrar Contenido" : "▼ Abrir Contenido"}
                                                    </button>
                                                    <button type='button' onClick={() => handleDeleteContent(index, contentIndex)} className='content-button'>Eliminar Contenido</button>
                                                    <div className='content-type-detail'>
                                                        <span>{content.type}</span>
                                                    </div>
                                                </div>
                                                <div key={contentIndex} className='create-content'>
                                                    {openContents[`${index}-${contentIndex}`] && (
                                                        <>
                                                            {content.type === 'paragraph' ? (
                                                                <textarea type='text' name='data' id={content.type + '-' + index + '-' + contentIndex} value={content.data} placeholder='Contenido' onChange={(e) => handleContentChange(index, contentIndex, e)} className='input-text-3' />
                                                            ) : content.type === 'list' ? (
                                                                <div className='inner-content-list'>
                                                                    <div className="list-container">
                                                                        {content.data.map((item, itemIndex) => (
                                                                            <div key={itemIndex} className="inner-content-list-2">
                                                                                <textarea
                                                                                    type="text"
                                                                                    value={item}
                                                                                    onChange={(e) => handleListItemChange(index, contentIndex, itemIndex, e)}
                                                                                    placeholder={`Elemento ${itemIndex + 1}`}
                                                                                    id={content.type + '-' + index + '-' + contentIndex}
                                                                                    className="input-text-4"
                                                                                />
                                                                                <input type="number" name="content-order" value={itemIndex} onChange={(e) => handleListOrderChange(index, contentIndex, itemIndex, e)} className="order-input" min="0" />
                                                                                <button type="button" onClick={() => handleRemoveListItem(index, contentIndex, itemIndex)} className="content-button-2">X</button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    
                                                                    <div className='list-add-button'>
                                                                        <button type="button" onClick={() => handleAddListItem(index, contentIndex)}>Agregar elemento</button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <input type='file' accept='image/*' onChange={(e) => handleContentImageUpload(index, contentIndex, e)} className='input-form' />
                                                            )}
                                                            <div className='inner-create-content-style'>
                                                                <select name='type' value={content.type} onChange={(e) => handleContentChange(index, contentIndex, e)} className='creation-select'>
                                                                    <option value='paragraph'>Párrafo</option>
                                                                    <option value='list'>Lista</option>
                                                                    <option value='image'>Imagen</option>
                                                                </select>
                                                                <input type='number' name='content-order' value={contentIndex} onChange={(e) => handleContentOrderChange(index, contentIndex, e)} min='0' className='order-input' />
                                                                {content.type === 'paragraph' && <input type='checkbox' checked={content.isSubtitle} onClick={(e) => handleIsSubtitleChange(index, contentIndex, e)} />}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </form>
            </div>
            <PreviewPost details={postData} />
        </div>
    );
}