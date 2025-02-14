import '../styles/home.css';
import React from 'react';
import PostCard from '../components/PostCard';

export default function Home ({posts}) {
    return (
        <div className='home-container'>
            <div className="grid-container">
                {posts.map(post => (
                    <div key={post.id} className="grid-item">
                        <PostCard data={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}