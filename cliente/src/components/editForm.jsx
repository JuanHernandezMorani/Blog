import React, { useEffect } from 'react';
import Form from './form.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, clearDetail } from '../actions';

function findID(title, posts) {
    const postTitle = title.replace(/-/g, ' ');
    const post = posts.find(post => post.title === postTitle);
    return post ? post.id : null;
}

export default function EditeForm() {
    const { title } = useParams();
    const dispatch = useDispatch();
    const originalPosts = useSelector(state => state.OriginalPosts);
    const details = useSelector(state => state.Details);
    const id = findID(title, originalPosts);

    useEffect(() => {
            if (id) {
                dispatch(getPostById(id));
            }
            return () => {
                dispatch(clearDetail());
            };
        }, [dispatch, id]);

    return (
        <div className='creation-form-container'>
            {details ? <Form postId={id}/> : <>Error 404 Post not found</>}
        </div>
    );
}