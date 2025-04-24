// src/components/Project/ProjectCard.jsx
import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, techStack, projectLink, image }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-title">{title}</div>
      <div className="project-description">{description}</div>
      <div className="project-tech">{techStack}</div>
      <a href={projectLink} className="project-link" target="_blank" rel="noopener noreferrer">
        View Project
      </a>
    </div>
  );
};

export default ProjectCard;
