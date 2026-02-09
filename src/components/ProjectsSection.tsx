import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useProjects } from "../hooks/usePortfolioData";

export function ProjectsSection() {
  const { data: projects } = useProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  // Memoize handlers for performance
  const handleMouseEnter = useCallback(
    (index: number) => setHoveredIndex(index),
    [],
  );
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-indigo-400 text-sm tracking-[0.3em] uppercase">
              Chapter 03
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-20 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent pb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>

          {/* Projects grid */}
          <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative will-change-transform transform-gpu"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  className="relative h-[320px] sm:h-[360px] md:h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-gray-700"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Project image placeholder with gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
                  />

                  {/* Animated grid overlay - using CSS animation */}
                  <div
                    className={`absolute inset-0 opacity-10 ${hoveredIndex === index ? "animate-grid-scroll" : ""}`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Content overlay */}
                  <div className="relative h-full p-8 flex flex-col justify-between">
                    <div>
                      <motion.div
                        className="text-sm text-indigo-400 mb-3 tracking-wide"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      >
                        {project.category}
                      </motion.div>
                      <motion.h3
                        className="text-3xl font-bold text-white mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      >
                        {project.description}
                      </motion.p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-gray-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.2 + 0.6 + tagIndex * 0.05,
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <motion.div
                        className="flex gap-4 relative z-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          hoveredIndex === index
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = project.liveUrl;
                            console.log("View Live clicked, URL:", url);
                            if (url && url !== "#" && url.trim() !== "") {
                              window.open(url, "_blank", "noopener,noreferrer");
                            } else {
                              alert("Live demo coming soon!");
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:bg-white/20 transition-colors cursor-pointer relative z-30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Live
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = project.githubUrl;
                            console.log("Code clicked, URL:", url);
                            if (url && url !== "#" && url.trim() !== "") {
                              window.open(url, "_blank", "noopener,noreferrer");
                            } else {
                              alert("Source code coming soon!");
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:bg-white/20 transition-colors cursor-pointer relative z-30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Glow effect on hover - simplified */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} blur-xl transition-opacity duration-300 pointer-events-none ${hoveredIndex === index ? "opacity-20" : "opacity-0"}`}
                  />
                </motion.div>

                {/* 3D effect shadow - simplified with CSS transition */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} blur-2xl -z-10 rounded-3xl transition-all duration-300 ${hoveredIndex === index ? "opacity-20 scale-105 translate-y-2" : "opacity-0 scale-100 translate-y-0"}`}
                />
              </motion.div>
            ))}
          </div>

          {/* View all projects CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View All Projects</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
