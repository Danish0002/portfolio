import React from "react";
import { motion } from "framer-motion";
import CertificateCard from "./CertificateCard";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CertificateSection = () => (
  <section className="pt-10 pb-20 px-5 bg-white">
    <motion.h2
      variants={headingVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="text-3xl font-bold text-center text-gray-800 mb-12"
    >
      Certificates
    </motion.h2>
    
    <CertificateCard />
  </section>
);

export default CertificateSection;
