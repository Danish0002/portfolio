import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Shape from "./Shape";

const awardVariants = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 },
  },
};

const followVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 },
  },
};

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#12071f] to-[#2f204e] p-4">
      
      {/* Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Shape />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Image Center Bottom */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center z-10">
        <img
          src="/hero.png"
          alt="Hero"
          className="h-[45vh] md:h-[70vh] object-contain"
        />
      </div>

      {/* Heading (3 lines on small screen) */}
      <div className="absolute top-16 left-6 z-30">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          <span className="block">Hey there,</span>
          <span className="block md:inline">I am</span>{" "}
          <span style={{ color: "rgb(255, 192, 203)" }} className="block md:inline">
            Danish!
          </span>
        </motion.h1>
      </div>

      {/* Description - hidden on small screens */}
<motion.div
  variants={awardVariants}
  initial="initial"
  animate="animate"
  viewport={{ once: false, amount: 0.3 }}
  className="hidden md:block absolute bottom-12 left-6 z-20 space-y-4 max-w-md"
>
  <motion.h2
    variants={awardVariants}
    className="text-2xl font-bold text-pink-300 tracking-wider leading-snug"
  >
    Web & Android Developer
  </motion.h2>

  <motion.p
    variants={awardVariants}
    className="text-white text-sm md:text-base leading-relaxed tracking-wide font-light"
  >
    Trusted Web & Android developer <br />
    delivering tailored and impactful digital solutions. <br />
    Focused on intuitive design, performance, and scalability <br />
    to empower businesses and startups across platforms.
  </motion.p>
</motion.div>




      {/* Follow Me Section */}
      <motion.div
        variants={followVariants}
        initial="initial"
        animate="animate"
        className="absolute top-6 right-6 z-20 bg-[#2f204e] px-4 py-4 rounded-xl shadow-2xl flex flex-col items-center gap-4 w-24 h-[220px]"
      >
        <motion.a variants={followVariants} href="https://linkedin.com/in/alamdanish">
          <img src="/LinkedIn.png" alt="LinkedIn" className="w-10 h-10 rounded" />
        </motion.a>
        <motion.a variants={followVariants} href="https://github.com/Danish0002">
          <img src="/GitHub.jpg" alt="GitHub" className="w-10 h-10 rounded" />
        </motion.a>
        <motion.a variants={followVariants} href="https://leetcode.com/u/Danish00z/">
          <img src="/LeetCode.png" alt="LeetCode" className="w-10 h-10 rounded" />
        </motion.a>

        <motion.div
          variants={followVariants}
          className="mt-6 rotate-90 origin-center self-center text-white text-sm font-medium bg-[#dd4c62] rounded-br-[10px] px-2 py-1 shadow-lg whitespace-nowrap"
        >
          FOLLOW ME
        </motion.div>
      </motion.div>

      {/* Circular Contact Button */}
      <motion.a
        href="SCV.pdf"
        className="absolute bottom-6 right-6 z-30"
        animate={{ x: [200, 0], opacity: [0, 1] }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" width="100" height="100">
            <circle cx="100" cy="100" r="90" fill="pink" />
            <path
              id="innerCirclePath"
              fill="none"
              d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
            <text className="fill-black text-[24px]">
              <textPath href="#innerCirclePath">Hire Now •</textPath>
            </text>
            <text className="fill-black text-[24px]">
              <textPath href="#innerCirclePath" startOffset="44%">
                Download CV •
              </textPath>
            </text>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </div>
        </motion.div>
      </motion.a>
    </div>
  );
};

export default Hero;
