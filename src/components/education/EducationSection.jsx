import React, { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "./EducationSection.css";

const educationData = [
  {
    title: "B.Tech, Computer Science & Engineering",
    school: "Lovely Professional University, Punjab, India",
    time: "Since August 2022",
    score: "CGPA: 8.04",
    color: "blue",
  },
  {
    title: "Intermediate",
    school: "Kanksa High School, Prayagpur, WB",
    time: "April 2015 - March 2017",
    score: "Percentage: 77.6%",
    color: "green",
  },
  {
    title: "Matriculation",
    school: "Ramkrishna Ashram Vidyapith, Prayagpur, WB",
    time: "April 2010 - March 2015",
    score: "Percentage: 89%",
    color: "purple",
  },
];

// Animation variants
const itemVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? 100 : -100,
  }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const EducationSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-100px", once: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="education-section">
      <h2 className="education-heading">🎓 Education Timeline</h2>
      <div className="timeline">
        <motion.div className="scroll-line" style={{ scaleY }} />
        {educationData.map((edu, i) => (
          <motion.div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"} ${edu.color}`}
            custom={i}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`icon-wrapper ${edu.color}`}>
              <GraduationCap />
            </div>
            <div className="timeline-content">
              <h3 className="timeline-title">{edu.title}</h3>
              <p className="timeline-school">{edu.school}</p>
              <p className="timeline-meta">
                {edu.time} | {edu.score}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
