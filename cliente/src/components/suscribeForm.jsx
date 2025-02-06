import '../styles/suscribeForm.css';
import React from 'react';

export default function SuscribeForm () {
    let name = 'suscribeForm';
    let container = name + '-container';
    return (
        <div className={container}>
            <p>
                {name} Component  
            </p>
        </div>
    );
}