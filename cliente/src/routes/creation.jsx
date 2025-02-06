import '../styles/creation.css';
import React from 'react';
import CreateForm from '../components/createForm.jsx';
import PreviewPost from '../components/previewPost.jsx';

export default function Creation () {
    return (
        <div className="creation-container">
            <div className='left'>
                <CreateForm />
            </div>
            <div className='right'>
                <PreviewPost />
            </div>
        </div>
    );
}