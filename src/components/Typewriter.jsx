import { useState, useEffect } from "react";

export default function Typewriter({
  words,
  speed = 105,
  deleteSpeed = 55,
  pause = 1300,
}) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const delay = del ? deleteSpeed : speed;
    const timer = setTimeout(() => {
      if (!del && text === word) {
        setTimeout(() => setDel(true), pause);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setIdx((i) => i + 1);
        return;
      }
      setText(
        del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [text, del, idx, words, speed, deleteSpeed, pause]);

  return (
    <span style={{ color: "var(--vsoft)" }}>
      {text}
      <span
        style={{
          animation: "blink 1s infinite, jitter 2s infinite",
          color: "var(--blush)",
        }}
      >
        |
      </span>{" "}
    </span>
  );
}
