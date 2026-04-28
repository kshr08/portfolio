export const PROJECTS = [
  {
    id: "01",
    name: "AttendIQ",
    tagline: "AI Attendance System",
    desc: "LLaMA 3.1-8b quiz generation via Groq API. Google OAuth, role-based routing, Helmet security, rate limiting.",
    stack: ["React", "Node.js", "MongoDB", "Groq API", "Express"],
    color: "#a78bfa",
    liveUrl: "https://attendiq.vercel.app",
    githubUrl: "https://github.com/shravani",
    img: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=700&q=80",
  },
  {
    id: "02",
    name: "CityPulse AI",
    tagline: "Adaptive Traffic Mgmt",
    desc: "Python + OpenCV vision pipeline, Ollama gemma3:4b, real-time signals via Socket.io, Supabase PostGIS backend.",
    stack: ["Python", "OpenCV", "React 19", "Supabase", "Socket.io"],
    color: "#f0abca",
    liveUrl: "#",
    githubUrl: "https://github.com/shravani",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80",
  },
  {
    id: "03",
    name: "IDEAL",
    tagline: "Browser-Based IDE",
    desc: "Monaco Editor + Piston API for multi-language code execution in the browser. 30+ languages, zero backend.",
    stack: ["React", "Monaco Editor", "Piston API", "Tailwind"],
    color: "#c4b5fd",
    liveUrl: "#",
    githubUrl: "https://github.com/shravani",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80",
  },
  {
    id: "04",
    name: "NEURO-DOCKS",
    tagline: "Infrastructure Prediction",
    desc: "Gemini 2.5 Flash demand forecasting with real-time analytics dashboard and predictive modeling.",
    stack: ["Next.js", "Gemini API", "PostgreSQL", "Chart.js"],
    color: "#ddd6fe",
    liveUrl: "#",
    githubUrl: "https://github.com/shravani",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  },
];

export const TECH_SKILLS = {
  Frontend: {
    color: "#a78bfa",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Redux"],
  },
  Backend: {
    color: "#f0abca",
    tags: [
      "Node.js",
      "Express.js",
      "Java",
      "Spring Boot",
      "REST APIs",
      "Socket.io",
    ],
  },
  Database: {
    color: "#c4b5fd",
    tags: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Redis"],
  },
  "AI / ML": {
    color: "#ddd6fe",
    tags: ["Python", "OpenCV", "Groq API", "LLaMA 3.1", "Gemini API", "Ollama"],
  },
  Tools: {
    color: "rgba(232,228,240,0.5)",
    tags: ["Git", "Docker", "Vercel", "Render", "Postman", "Figma"],
  },
};

export const SOFT_SKILLS = [
  { name: "Problem Solving", icon: "🧩", color: "#a78bfa" },
  { name: "Team Collaboration", icon: "🤝", color: "#f0abca" },
  { name: "Fast Learner", icon: "⚡", color: "#c4b5fd" },
  { name: "Communication", icon: "💬", color: "#ddd6fe" },
  { name: "Adaptability", icon: "🌊", color: "#a78bfa" },
  { name: "Attention to Detail", icon: "🔍", color: "#f0abca" },
  { name: "Time Management", icon: "⏱️", color: "#c4b5fd" },
  { name: "Creative Thinking", icon: "✨", color: "#ddd6fe" },
];
