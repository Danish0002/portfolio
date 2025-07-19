import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LeetCodeCard from '../leetcode/LeetCodeCard';
import DevStatsCard from '../github/DevStatsCard';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
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
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
        >
          Developer Profiles
        </motion.h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 w-full justify-center">
          {[<LeetCodeCard key="1" />, <DevStatsCard key="2" />].map((Card, index) => (
            <motion.div
              key={index}
              className="flex-1 min-w-[300px] sm:max-w-[48%]"
              variants={itemVariants}
              custom={index}
            >
              {Card}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
