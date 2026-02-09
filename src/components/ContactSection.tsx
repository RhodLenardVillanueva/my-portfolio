import { motion, useInView, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import {
  useContactInfo,
  usePersonalInfo,
  useSocialLinks,
} from "../hooks/usePortfolioData";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export function ContactSection() {
  const { data: personalInfo } = usePersonalInfo();
  const { data: socialLinks } = useSocialLinks();
  const { data: contactInfo } = useContactInfo();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x: x * 0.05, y: y * 0.05 });
    },
    [prefersReducedMotion],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase database
      if (isSupabaseConfigured()) {
        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          });

        if (dbError) {
          console.error("Database error:", dbError);
          throw new Error("Failed to save message");
        }
      }

      // Send email notification via API
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.warn("Email notification failed, but message was saved");
        }
      } catch (emailError) {
        // Email failed but message was saved - still consider it a success
        console.warn("Email notification failed:", emailError);
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 flex items-center"
    >
      {/* Background gradient orbs - using CSS animation for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-indigo-600 rounded-full blur-[40px] md:blur-[60px] opacity-20 animate-pulse-slow will-change-transform transform-gpu" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-600 rounded-full blur-[40px] md:blur-[60px] opacity-20 animate-pulse-slower will-change-transform transform-gpu" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-indigo-400 text-sm tracking-[0.3em] uppercase">
            Chapter 04
          </span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent pb-3"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's Create Something Amazing
        </motion.h2>

        <motion.p
          className="text-xl text-gray-400 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Have a project in mind? Let's discuss how we can bring your ideas to
          life with cutting-edge technology and creative design.
        </motion.p>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors backdrop-blur-sm"
              whileFocus={{
                scale: 1.02,
                borderColor: "rgba(99, 102, 241, 0.8)",
              }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors backdrop-blur-sm"
              whileFocus={{
                scale: 1.02,
                borderColor: "rgba(99, 102, 241, 0.8)",
              }}
            />
          </div>
          <motion.textarea
            placeholder="Tell me about your project..."
            rows={6}
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            required
            className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors backdrop-blur-sm resize-none mb-6"
            whileFocus={{ scale: 1.01, borderColor: "rgba(99, 102, 241, 0.8)" }}
          />

          {/* Submit button */}
          <div className="flex items-center gap-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium overflow-hidden group will-change-transform transform-gpu disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{
                scale: prefersReducedMotion || isSubmitting ? 1 : 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Send
                  className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`}
                />
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 blur-lg opacity-30 animate-pulse-slow" />
            </motion.button>

            {submitStatus === "success" && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-400"
              >
                Message sent successfully!
              </motion.span>
            )}
            {submitStatus === "error" && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400"
              >
                Failed to send. Please try again.
              </motion.span>
            )}
          </div>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-gray-500 mb-6">Or connect with me on</div>
          <div className="flex gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`p-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-400 ${social.color} transition-colors backdrop-blur-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(99, 102, 241, 0.5)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p>
            &copy; 2026 Rhod Lenard Villanueva. Crafted with passion and code.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
