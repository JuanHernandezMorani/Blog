import '../styles/createForm.css';
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import PreviewPost from './previewPost.jsx';
import { createPost } from '../actions';
import Swal from 'sweetalert2';

function validate (post) {
    const errors = {};
    if(!post.title) errors.title = 'El nombre es obligatorio.';
    if(post.title.length < 3) errors.title = 'El nombre debe tener minimo 3 caracteres.';
    if(post.sections.length < 1) errors.sections = 'Las secciones no pueden estar vacias.';
    if(post.backgroundColor.length !== 7) errors.backgroundColor = 'Formato no valido, porfavor asegurate que el formato de color este dentro de los parametros validos.';

    return errors;
}

export default function CreateForm () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: '',
        coverImage: '',
        backgroundColor: '',
        collaborators: [],
        status: 'published',
        sections: []
    });

    /*section example
            {
                subtitle: '',
                order: 1,
                contents: [
                    {
                        type: 'paragraph',
                        data: 'text',
                        order: 1,
                        isSubtitle: false,
                    }
                ]
            }
    */

    /*
    function handleSections () {

    }

    function handleContents () {

    }
    */

    function handleChange (e) {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...postData,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit (e) {
        e.preventDefault();
        let errors = validate(postData);
        if(!errors.name && !errors.sections && !errors.contents){
            dispatch(createPost(postData));
            Swal.fire({
                icon: 'success',
                title: 'Post created successfully',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              .then(
                navigate('/')
              );
        }
    }

    return (
        <div className='creation-form-container'>
           <div className='creation-form-component'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <h3 className='form-data-title-styled'>Titulo</h3>
                        <input type="text" value={postData.title} placeholder='Insert post title' name='title' onChange={(e) => handleChange(e)} className='input-form' />
                        {errors.title && <p className="input-errors">{errors.title}</p>}
                    </div>
                </form>
           </div>
           <div className='preview-component'>
            <PreviewPost details={postData}/>
           </div>
        </div>
    );
}