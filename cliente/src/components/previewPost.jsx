import '../styles/previewPost.css';
import React from 'react';

export default function PreviewPost () {
    let name = 'previewPost';
    let container = name + '-container';
    return (
        <div className={container}>
            <p>
                {name} Component  
            </p>
        </div>
    );
}