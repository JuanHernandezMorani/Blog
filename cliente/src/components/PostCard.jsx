import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/PostCard.css";

const PostCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="post-card" onClick={() => navigate(`/${data.title.replace(/\s+/g, '-')}`)}>
      <div
        className="post-image"
        style={{ backgroundColor: data.backgroundColor }}
      >
        <img src={data.coverImage} alt={data.title} className="img-fluid"/>
      </div>
      <div className="post-content">
        <h3 className="post-title">{data.title}</h3>
        {data.description ? <p className="post-description">{data.description}</p> : <></>}
      </div>
    </div>
  );
};

export default PostCard;