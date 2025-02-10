import '../styles/previewPost.css';
import React from 'react';
import Newsletter from './suscribeForm.jsx';
import PostCard from './PostCard.jsx';

export default function PreviewPost ({details}) {
    return (
        <div className='previewPost-container'>
            <div className="post-home-preview">
                <PostCard data={details} />
            </div>
            <div className="detail-page">
                <header className='post-head' style={{ backgroundColor: details.backgroundColor }}>
                    <div className='head-detail'>
                        <h1 className='detail-title'>{details.title}</h1>
                        <img src={details.coverImage} alt={details.title} className='img-fluid'/>
                    </div>
                    <div className='head-colab'>
                        <span className='detail-colab'>Colaboradores: {Array.isArray(details.collaborators) ? details.collaborators.join(', ') : details.collaborators}</span>
                    </div>
                </header>
                <div className='detail-inner'>
                    <div className='table'>
                        <h3>TABLA DE CONTENIDO</h3>
                        <nav className="detail-content-table">
                            <ul>
                                {details.sections.map((section,index) => (
                                    <li key={index}>
                                        <a className='section-link' href={`#${section.subtitle}`}>{section.subtitle}</a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='detail-container'>
                        <article className='post-sections'>
                            {details.sections.map((section,index) => (
                                <section key={index} id={section.subtitle} className='post-section'>
                                    <h2 className='section-title'>{section.subtitle}</h2>
                                    {section.contents.map((content,indexC) => (
                                        <div key={indexC} className='content-block'>
                                            {content.type === "paragraph" && (
                                                content.isSubtitle ?
                                                    <h3 className='content-subtitle'>{content.data}</h3> :
                                                    <p className='content-text'>{content.data}</p>
                                            )}
                                            {content.type === "list" && (
                                                <ul className='content-list'>
                                                    {content.data.map((item, index) => (
                                                        <li key={`${indexC}-${index}`} className='list-item'>{item}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {content.type === "image" && (
                                                <img src={content.data} alt={`content-${indexC}`} className='content-image img-fluid'/>
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
        </div>
    );
}