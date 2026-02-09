import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  useExperiences,
  usePersonalInfo,
  useStats,
} from "../hooks/usePortfolioData";

export function AboutSection() {
  const { data: personalInfo } = usePersonalInfo();
  const { data: stats } = useStats();
  const { data: experiences } = useExperiences();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Reduced parallax effect for better performance
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [50, -50],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.5, 1, 1, 0.5],
  );

  return (
    <div id="about" ref={containerRef} className="relative min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-indigo-400 text-sm tracking-[0.3em] uppercase">
              Chapter 01
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent pb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Me
          </motion.h2>

          <div
            className="grid md:grid-cols-2 gap-16 items-start"
            ref={contentRef}
          >
            {/* Left column - Text */}
            <div>
              <motion.p
                className="text-xl text-gray-300 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {personalInfo.bio}
              </motion.p>
              <motion.p
                className="text-xl text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {personalInfo.extendedBio}
              </motion.p>
            </div>

            {/* Right column - Floating stats */}
            <motion.div
              style={{ y }}
              className="relative will-change-transform transform-gpu"
            >
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`p-6 bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-2xl backdrop-blur-sm`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(99, 102, 241, 0.4)",
                    }}
                  >
                    <div
                      className={`text-4xl font-bold ${stat.textColor} mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="mt-32">
            <motion.h3
              className="text-3xl font-bold mb-12 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Experience Timeline
            </motion.h3>

            <div className="space-y-8 relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-0 top-2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-black"
                    whileHover={{ scale: 1.5 }}
                  />

                  <div className="text-indigo-400 text-sm mb-1">{exp.year}</div>
                  <div className="text-xl font-semibold text-white mb-1">
                    {exp.title}
                  </div>
                  <div className="text-gray-400 mb-2">{exp.company}</div>
                  <div className="text-gray-500">{exp.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
