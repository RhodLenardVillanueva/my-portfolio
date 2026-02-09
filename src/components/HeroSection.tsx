import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { usePersonalInfo } from "../hooks/usePortfolioData";

export function HeroSection() {
  const { data: personalInfo } = usePersonalInfo();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Skip heavy animations if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background grid */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      {/* Floating orbs - using CSS animation for performance */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-indigo-600 rounded-full blur-[40px] md:blur-[60px] opacity-30 will-change-transform animate-float-slow transform-gpu" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-600 rounded-full blur-[40px] md:blur-[60px] opacity-20 will-change-transform animate-float-slower transform-gpu" />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-indigo-400 text-sm tracking-[0.3em] uppercase font-medium">
            {personalInfo.title}
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span
            className="inline-block bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent animate-gradient-x"
            style={{ backgroundSize: "200% auto" }}
          >
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="relative z-10">View My Work</span>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          <motion.button
            className="w-full sm:w-auto px-8 py-4 border border-indigo-500 rounded-full font-medium hover:bg-indigo-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll indicator - CSS animation for performance */}
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-gray-500 text-sm flex flex-col items-center gap-2 animate-bounce-slow">
            <span className="text-xs tracking-wider">SCROLL</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
