// src/components/Certificate/CertificateSection.jsx
import React from "react";
import { motion } from "framer-motion";
import certificates from "./certificatesData";

/* ───────── variants ───────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, rotateY: -90, transformPerspective: 800 },
  show: i => ({
    opacity: 1,
    rotateY: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CertificateSection = () => (
  <section className="py-10 px-5 min-h-screen bg-gradient-to-b from-cyan-100 to-white">
    <motion.h2
      variants={headingVariants}
      initial="hidden"
      whileInView="show"
      className="text-3xl font-bold text-center text-gray-800 mb-8"
    >
      Certificates
    </motion.h2>

    <motion.div
      className="flex flex-wrap justify-center gap-10 items-stretch"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-20% 0px" }}
    >
      {certificates.map((cert, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          custom={i}
          className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col"
        >
          {/* Inlined Card */}
          <div className="transform bg-white border border-gray-200 rounded-xl p-5 shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-auto rounded-lg mb-4 object-cover"
              loading="lazy"
            />
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {cert.title}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              Issued by: {cert.issuer}
            </div>
            <div className="text-sm text-gray-600 mb-2">Date: {cert.date}</div>
            <a
              href={cert.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-sm text-blue-600 hover:underline"
            >
              View Certificate
            </a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default CertificateSection;
