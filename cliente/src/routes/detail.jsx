import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getPostById, clearDetail } from '../actions';
import '../styles/detail.css';
import Newsletter from '../components/suscribeForm.jsx';

function findID(title, posts) {
    const postTitle = title.replace(/-/g, ' ');
    const post = posts.find(post => post.title === postTitle);
    return post ? post.id : null;
}

export default function Detail() {
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

    if (!details) return <p>Loading post details...</p>;

    return (
        <div className="detail-page">
            <header className='post-head' style={{ backgroundColor: details.backgroundColor }}>
                <div className='head-detail'>
                    <h1 className='detail-title' style={{ color: details.fontColor || '#f4f4f4' }}>{details.title}</h1>
                    <img src={details.coverImage} alt={details.title} className='img-fluid'/>
                </div>
                <div className='head-colab'>
                    <span className='detail-colab' style={{ color: details.fontColor || '#f4f4f4' }}>Colaboradores: {Array.isArray(details.collaborators) ? details.collaborators.join(', ') : details.collaborators}</span>
                </div>
            </header>
            <div className='detail-inner'>
                <div className='table'>
                    <h3>TABLA DE CONTENIDO</h3>
                    <nav className="detail-content-table">
                        <ul>
                    {details.sections.map(section => (
                        <li key={section.id}>
                            <a className='section-link' href={`#${section.subtitle}`}>{section.subtitle}</a>
                        </li>
                    ))}
                        </ul>
                    </nav>
                </div>
                <div className='detail-container'>
                <article className='post-sections'>
                    {details.sections.map(section => (
                        <section key={section.id} id={section.subtitle} className='post-section'>
                            <h2 className='section-title'>{section.subtitle}</h2>
                            {section.contents.map(content => (
                                <div key={content.id} className='content-block'>
                                    {content.type === "paragraph" && (
                                        content.isSubtitle ?
                                            <h3 className='content-subtitle'>{content.data}</h3> :
                                            <p className='content-text'>{content.data}</p>
                                    )}
                                    {content.type === "list" && (
                                        <ul className='content-list'>
                                            {content.data.map((item, index) => (
                                                <li key={`${content.id}-${index}`} className='list-item'>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {content.type === "image" && (
                                        <img src={content.data} alt={`content-${content.id}`} className='content-image img-fluid'/>
                                    )}
                                </div>
                            ))}
                        </section>
                    ))}
                </article>
                </div>
                <div className='suscribe-form'>
                    <Newsletter />
                </div>
            </div>
        </div>
    );
}