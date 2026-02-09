import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useSkills, useTechCategories } from "../hooks/usePortfolioData";

export function SkillsSection() {
  const { data: skills } = useSkills();
  const { data: techCategories } = useTechCategories();
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5],
  );

  return (
    <div id="skills" ref={containerRef} className="relative min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-indigo-400 text-sm tracking-[0.3em] uppercase">
              Chapter 02
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-20 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent pb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Skills & Expertise
          </motion.h2>

          <div ref={skillsRef} className="grid md:grid-cols-2 gap-8 mb-20">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-2xl backdrop-blur-sm overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    borderColor: "rgba(99, 102, 241, 0.5)",
                    scale: 1.02,
                  }}
                >
                  {/* Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${skill.color}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} relative`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1 + 0.5,
                        ease: "easeOut",
                      }}
                    >
                      {/* Static glow effect - uses CSS instead of JS animation */}
                      <div className="absolute right-0 top-0 bottom-0 w-20 bg-white/20 blur-md animate-pulse-slow" />
                    </motion.div>
                  </div>

                  {/* Percentage */}
                  <motion.div
                    className="text-right mt-2 text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                  >
                    {skill.level}%
                  </motion.div>

                  {/* Hover glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Technologies organized by category */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-12 text-gray-300">
              Technologies I Work With
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-2xl backdrop-blur-sm group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.9 + categoryIndex * 0.1,
                    }}
                    whileHover={{
                      borderColor: "rgba(99, 102, 241, 0.5)",
                      scale: 1.02,
                    }}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient}`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-white">
                        {category.title}
                      </h4>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      {category.techs.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          className="px-3 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-300 border border-gray-700/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: 1 + categoryIndex * 0.1 + techIndex * 0.05,
                          }}
                          whileHover={{
                            backgroundColor: "rgba(99, 102, 241, 0.1)",
                            borderColor: "rgba(99, 102, 241, 0.3)",
                            x: 5,
                          }}
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
