import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Cursor from "./components/Cursor.jsx";
import AuroraCanvas from "./components/AuroraCanvas.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Skills from "./pages/Skills.jsx";
import Contact from "./pages/Contact.jsx";
import Spotlight from "./components/Spotlight.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuroraCanvas />
      <Cursor />
      <Spotlight />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}