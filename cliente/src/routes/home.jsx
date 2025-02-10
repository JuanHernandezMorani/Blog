import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions';
import PostCard from '../components/PostCard';

export default function Home () {
    const posts = useSelector(state => state.OriginalPosts);
    const dispatch = useDispatch();
    const [charge, setCharge] = useState(false);

    useEffect(() => {
        setCharge(true);        
        
        if(posts.length < 1 || posts === undefined){
            dispatch(getPosts());
            setTimeout(() => {
                setCharge(false);
            }, 2000);
        }
        else{
            setTimeout(() => {
                setCharge(false);
            }, 1);
        }
    } , [ dispatch, posts ]);

    return (
        <div className='home-container'>
            <div className="grid-container">
                {!charge && posts.length > 0 ? posts.map(post => (
                    <div key={post.id} className="grid-item">
                        <PostCard data={post} />
                    </div>
                )) :
                charge ? <div>LOADING...</div>
                : <div>No data found</div>}
                
            </div>
        </div>
    );
}