import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LeetCodeCard from '../leetcode/LeetCodeCard';
import DevStatsCard from '../github/DevStatsCard';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
  },
  show: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px' });

  return (
    <section ref={ref} className="flex justify-center px-4 py-8 bg-background">
      <motion.div
        className="w-full max-w-6xl flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.h2
          className="text-3xl font-semibold text-center"
          variants={headingVariants}
        >
          Developer Profiles
        </motion.h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 w-full justify-center">
          {[<LeetCodeCard key="1" />, <DevStatsCard key="2" />].map((Card, index) => (
            <motion.div
              key={index}
              className="flex-1 min-w-[300px] sm:max-w-[48%]"
              style={{ transformStyle: 'preserve-3d' }}
              variants={cardVariants}
              whileHover={{ rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {Card}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
