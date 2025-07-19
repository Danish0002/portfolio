import React from "react";
import { motion } from "framer-motion";
import CertificateCard from "./CertificateCard";
import certificates from "./certificatesData.js";

/* ───────── variants ───────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

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

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CertificateSection = () => {
  return (
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
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            custom={index}
            className="w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] flex flex-col"
          >
            <CertificateCard {...cert} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CertificateSection;
