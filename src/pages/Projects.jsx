import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard.jsx";
import { PROJECTS } from "../data.js";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Projects() {
  return (
    <section style={{ minHeight: "100vh", padding: "110px 60px 80px" }}>
      <motion.p
        {...fade()}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "#6b6b7a",
          marginBottom: 8,
        }}
      >
        // 02. selected_projects
      </motion.p>

      <motion.h1
        {...fade(0.08)}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(38px, 6vw, 70px)",
          letterSpacing: -2.5,
          color: "#fef9ef",
          marginBottom: 16,
          lineHeight: 1,
        }}
      >
        Things I've{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #f4a7b9, #fcd5b5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Built
        </span>
      </motion.h1>

      <motion.p
        {...fade(0.14)}
        style={{
          fontSize: 15,
          color: "#6b6b7a",
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 56,
        }}
      >
        A selection of projects I've built — ranging from AI-powered tools to
        real-time systems. Click any image to expand it.
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))",
          gap: 22,
        }}
      >
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            style={{
              transform: i % 2 === 0 ? "translateY(0px)" : "translateY(18px)",
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
