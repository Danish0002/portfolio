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
  show: (i) => ({
    opacity: 1,
    rotateY: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const CertificateCard = () => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4 mb-16"
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.3 }} // ✅ Changed here
  >
    {certificates.map((cert, i) => (
      <motion.div
        key={i}
        variants={itemVariants}
        custom={i}
        className="flex flex-col"
      >
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg flex flex-col justify-between h-full transition-transform duration-200 ease-in-out hover:-translate-y-1">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-48 rounded-lg mb-4 object-cover"
            loading="lazy"
          />
          <div className="text-lg font-semibold text-gray-800 mb-2">
            {cert.title}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            Issued by: {cert.issuer}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Date: {cert.date}
          </div>
          <a
            href={cert.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-sm font-medium text-blue-600 hover:underline"
          >
            View Certificate
          </a>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default CertificateCard;
