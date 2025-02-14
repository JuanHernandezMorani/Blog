import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/PostCard.css";

const PostCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="post-card">
      <div
        className="post-image" style={{ backgroundColor: data.backgroundColor }} onClick={() => navigate(`/read/${data.title.replace(/\s+/g, '-')}`)} >
        <img src={data.coverImage} alt={data.title} className="img-fluid"/>
      </div>
      <div className="post-content" onClick={() => navigate(`/read/${data.title.replace(/\s+/g, '-')}`)} >
        <h3 className="post-title">{data.title}</h3>
      </div>
    </div>
  );
};

export default PostCard;