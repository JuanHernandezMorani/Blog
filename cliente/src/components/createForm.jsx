import '../styles/createForm.css';
import React from 'react';

export default function CreateForm () {
    let name = 'createForm';
    let container = name + '-container';
    return (
        <div className={container}>
            <p>
                {name} Component  
            </p>
        </div>
    );
}