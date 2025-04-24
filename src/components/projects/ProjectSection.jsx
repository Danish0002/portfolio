import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import projects from "./projectsData";
import "./ProjectSection.css"; // 👈 Import CSS

// Parent orchestrator
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Card pop‑in
const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.6,
    },
  }),
};

// Heading fade‑up
const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectSection = () => {
  return (
    <section className="project-section">
      <motion.h2
        className="project-heading"
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <motion.div
        className="project-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-20% 0px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            custom={index}
            style={{ flex: "1 1 300px" }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectSection;
