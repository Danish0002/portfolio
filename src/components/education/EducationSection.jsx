import React, { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const educationData = [
  {
    title: 'B.Tech, Computer Science & Engineering',
    school: 'Lovely Professional University, Punjab, India',
    time: 'Since August 2022',
    score: 'CGPA: 8.04',
    color: 'blue-500',
    bg: 'bg-white',
  },
  {
    title: 'Intermediate',
    school: 'Kanksa High School, Prayagpur, WB',
    time: 'April 2015 – March 2017',
    score: '77.6%',
    color: 'green-500',
    bg: 'bg-gray-50',
  },
  {
    title: 'Matriculation',
    school: 'Ramkrishna Ashram Vidyapith, Prayagpur, WB',
    time: 'April 2010 – March 2015',
    score: '89%',
    color: 'purple-500',
    bg: 'bg-gray-100',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function EducationSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-cyan-50 to-white py-24 px-4 md:px-24"
    >
      {/* Central line */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-300 opacity-60 origin-top -translate-x-1/2"
        style={{ scaleY }}
      />

      {/* Heading */}
      <div className="relative z-10 flex justify-center mb-16">
        <h2 className="bg-white px-8 py-3 text-4xl font-extrabold tracking-tight text-gray-800 rounded-full shadow-lg">
          🎓 Education Timeline
        </h2>
      </div>

      {/* Timeline entries */}
      <div className="space-y-20">
        {educationData.map((edu, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-center ${
                isLeft ? 'md:flex-row-reverse text-right' : ''
              }`}
            >
              {/* Icon marker */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-10">
                <GraduationCap className={`w-6 h-6 text-${edu.color}`} />
              </div>

              {/* Card */}
              <div
                className={`mt-12 md:mt-0 w-full md:w-1/2 ${
                  isLeft ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <div
                  className={`${edu.bg} border-l-4 border-${edu.color} p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                >
                  <h3 className="text-2xl font-semibold text-gray-900">{edu.title}</h3>
                  <p className="text-gray-700 mt-2">{edu.school}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="italic">{edu.time}</span>
                    <span className="font-medium">Score: {edu.score}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
