import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const getColorStyles = (color) => {
  const base = {
    blue: "blue",
    green: "green",
    purple: "purple",
  }[color];

  return {
    hoverBg: `hover:bg-${base}-100/20`,
    iconBg: `hover:bg-${base}-100`,
    borderColor: `hover:border-${base}-500`,
    ringColor: `ring-${base}-500`,
    text: `text-${base}-500`,
  };
};

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

const EducationCard = ({ edu, i, isInView }) => {
  const color = getColorStyles(edu.color);
  const isLeft = i % 2 === 0;

  return (
    <motion.div
      className={`relative flex w-full max-w-5xl px-4 z-10 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } ${color.hoverBg} group transition duration-300 ease-in-out`}
      custom={i}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`bg-white p-5 rounded-full border-4 shadow-sm transition-transform duration-300 transform group-hover:scale-110 group-hover:rotate-6 ${color.ringColor} ${color.text}`}
      >
        <GraduationCap className="w-9 h-9" />
      </div>

      <div
        className={`bg-white shadow-lg border-l-4 px-10 py-6 rounded-xl mx-6 max-w-lg text-left transition-colors duration-300 group-hover:${color.borderColor}`}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">
          {edu.title}
        </h3>
        <p className="text-lg md:text-xl text-slate-600 mb-2">
          {edu.school}
        </p>
        <p className="text-base md:text-lg italic text-slate-500">
          {edu.time} | {edu.score}
        </p>
      </div>
    </motion.div>
  );
};

export default EducationCard;
