import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions';
import { Link } from 'react-router-dom';

export default function Home () {
    const posts = useSelector(state => state.OriginalPosts);
    const dispatch = useDispatch();
    const [charge, setCharge] = useState(false)

    useEffect(() => {
        setCharge(true);        
        dispatch(getPosts());
        setTimeout(() => {
            setCharge(false);
        }, 1000);
    } , [ dispatch ]);

    return (
        <div className='home-container'>
            <div className="grid-container">
                {!charge && posts.length > 0 ? posts.map(post => (
                    <div key={post.id} className="grid-item">
                        <Link to={`/${post.title.replace(/\s+/g, '-')}`}>
                            <strong>{post.title}</strong>
                        </Link>
                    </div>
                )) :
                charge ? <div>LOADING...</div>
                : <div>No data found</div>}
                
            </div>
        </div>
    );
}