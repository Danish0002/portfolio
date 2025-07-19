import React from "react";

const ProjectCard = ({ title, description, techStack, projectLink, image }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 h-full flex flex-col justify-between">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-sm text-gray-500 italic">{techStack}</p>
      </div>
      <a
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-blue-600 text-sm hover:underline"
      >
        View Project
      </a>
    </div>
  );
};

export default ProjectCard;
