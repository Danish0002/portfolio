import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LeetCodeCard from '../leetcode/LeetCodeCard';
import DevStatsCard from '../github/DevStatsCard';
import './StatsSection.css';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

// itemVariants uses the index (i) to stagger and animate each card
const itemVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? 100 : -100, // Position to the left for odd, right for even
  }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,  // Stagger each card's animation based on its index
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px' });

  return (
    <section ref={ref} className="stats-container">
      <motion.div
        className="stats-inner"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.h2
          className="stats-heading"
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
        >
          Developer Profiles
        </motion.h2>

        <div className="stats-cards">
          {/* Map over the cards and apply the itemVariants based on index */}
          {[<LeetCodeCard key="1" />, <DevStatsCard key="2" />].map((Card, index) => (
            <motion.div
              key={index}
              className="stats-card"
              variants={itemVariants} // Apply the itemVariants here
              custom={index}  // Pass the index as a "custom" prop to variants
            >
              {Card}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
