import '../styles/home.css';
import React, { useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home ({posts}) {
    const [charge, setCharge] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!charge) {
            if(!posts) dispatch(getPosts());
            setCharge(true);
        }
    } , [ dispatch ]);


    return (
        <div className='home-container'>
           { posts && charge ?<div className="grid-container">
                {posts.map(post => (
                    <div key={post.id} className="grid-item">
                        <PostCard data={post} />
                    </div>
                ))}
            </div>
            : charge ? <div>LOADING...</div>
            : <div>No data found</div>}
        </div>
    );
}