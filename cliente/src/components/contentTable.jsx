import '../styles/contentTable.css';
import React from 'react';

export default function ContentTable () {
    let name = 'contentTable';
    let container = name + '-container';
    return (
        <div className={container}>
            <p>
                {name} Component  
            </p>
        </div>
    );
}