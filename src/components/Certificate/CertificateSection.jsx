import React from "react";
import { motion } from "framer-motion";

import CertificateCard from "./CertificateCard";
import certificates from "./certificatesData";
import "./CertificateSection.css";

/* ───────── variants ───────── */

// Parent orchestrator (optional but nice)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Card animation, index‑aware
const itemVariants = {
  hidden: { opacity: 0, rotateY: -90, transformPerspective: 800 },
  show: (i) => ({
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};



// Heading fade‑up
const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CertificateSection = () => {
  return (
    <section className="certificate-section">
      {/* heading */}
      <motion.h2 variants={headingVariants} initial="hidden" whileInView="show">
        Certificates
      </motion.h2>

      {/* cards container */}
      <motion.div
        className="certificate-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-20% 0px" }} // triggers ~20% before in‑view
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            custom={index}           // pass idx to variant
            className="certificate-card-wrapper"
          >
            <CertificateCard {...cert} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CertificateSection;
