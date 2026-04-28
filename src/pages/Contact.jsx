import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SOCIALS = [
  {
    label: "Email",
    val: "spkhindre@gmail.com",
    color: "#f4a7b9",
    href: "mailto:spkhindre@gmail.com",
  },
  {
    label: "LinkedIn",
    val: "linkedin.com/in/shravani-khindre",
    color: "#c4b5fd",
    href: "https://www.linkedin.com/in/shravani-khindre-0b0044282/",
  },
  {
    label: "GitHub",
    val: "github.com/kshr08",
    color: "#a7f3d0",
    href: "https://github.com/kshr08",
  },
  {
    label: "Location",
    val: "Maharashtra, India",
    color: "#fcd5b5",
    href: null,
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await axios.post("/api/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "#0d0d0f",
    border: "1px solid #2a2a35",
    borderRadius: 9,
    padding: "12px 16px",
    color: "#fef9ef",
    fontSize: 14,
    outline: "none",
    width: "100%",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s",
  };

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
        // 04. get_in_touch
      </motion.p>

      <motion.h1
        {...fade(0.08)}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(38px, 6vw, 70px)",
          letterSpacing: -2.5,
          color: "#fef9ef",
          marginBottom: 14,
          lineHeight: 1,
        }}
      >
        Let's{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #fcd5b5, #f4a7b9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Connect
        </span>
      </motion.h1>

      <motion.p
        {...fade(0.14)}
        style={{
          fontSize: 15,
          color: "#6b6b7a",
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 56,
        }}
      >
        Got an opportunity, collaboration idea, or just want to say hi? Your
        message lands directly in my inbox — I'll reply from my email.
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          maxWidth: 920,
        }}
      >
        {/* Socials */}
        <motion.div
          {...fade(0.18)}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href || undefined}
              target={
                s.href && !s.href.startsWith("mailto") ? "_blank" : undefined
              }
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: "#141416",
                border: "1px solid #2a2a35",
                borderRadius: 12,
                transition: "border-color 0.2s, background 0.2s",
                cursor: s.href ? "pointer" : "default",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (s.href) {
                  e.currentTarget.style.borderColor = s.color + "55";
                  e.currentTarget.style.background = s.color + "0a";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2a2a35";
                e.currentTarget.style.background = "#141416";
              }}
            >
              <span style={{ fontSize: 11, color: "#6b6b7a", minWidth: 60 }}>
                {s.label}
              </span>
              <span style={{ fontSize: 13, color: s.color, fontWeight: 500 }}>
                {s.val}
              </span>
              {s.href && (
                <span
                  style={{ marginLeft: "auto", fontSize: 11, color: "#6b6b7a" }}
                >
                  ↗
                </span>
              )}
            </a>
          ))}

          {/* Note */}
          <div
            style={{
              marginTop: 8,
              padding: "16px 20px",
              background: "#f4a7b908",
              border: "1px solid #f4a7b922",
              borderRadius: 12,
            }}
          >
            <p style={{ fontSize: 12, color: "#6b6b7a", lineHeight: 1.6 }}>
              📬 Messages via this form are sent directly to my Gmail via
              Nodemailer. I'll reply thread so we can continue the conversation
              over email.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          {...fade(0.22)}
          style={{
            background: "#141416",
            border: "1px solid #2a2a35",
            borderRadius: 18,
            padding: 30,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#f4a7b966")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a35")}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={set("email")}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#c4b5fd66")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a35")}
          />
          <textarea
            placeholder="Your message..."
            rows={5}
            value={form.message}
            onChange={set("message")}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#a7f3d066")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a35")}
          />

          <motion.button
            whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={submit}
            disabled={status === "sending" || status === "sent"}
            style={{
              background:
                status === "sent"
                  ? "linear-gradient(135deg, #a7f3d0, #6ee7b7)"
                  : status === "error"
                    ? "linear-gradient(135deg, #f87171, #fca5a5)"
                    : "linear-gradient(135deg, #f4a7b9, #c4b5fd)",
              color: "#0d0d0f",
              padding: "13px",
              borderRadius: 9,
              border: "none",
              fontSize: 14,
              fontWeight: 700,
              opacity: status === "sending" ? 0.7 : 1,
              transition: "background 0.4s, opacity 0.2s",
            }}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "✓ Message Sent!"
                : status === "error"
                  ? "Failed — Try Again"
                  : "Send Message →"}
          </motion.button>

          {status === "sent" && (
            <p style={{ fontSize: 12, color: "#a7f3d0", textAlign: "center" }}>
              I'll reply to {form.email || "your email"} shortly!
            </p>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        {...fade(0.3)}
        style={{
          marginTop: 100,
          paddingTop: 32,
          borderTop: "1px solid #2a2a35",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            fontWeight: 800,
            background: "linear-gradient(135deg, #f4a7b9, #c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
          }}
        >
          SHRAVANI
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#6b6b7a",
          }}
        >
          Designed & built with React · 2026
        </span>
      </motion.footer>
    </section>
  );
}
