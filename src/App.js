import React, { useEffect, useState } from "react";
import "./App.css";
import SplashCursor from "./components/SplashCursor"; // optional if you still want the splash cursor
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenFancy,
  faMagic,
  faUndo,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.8;
      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        if (top < triggerBottom) sec.classList.add("visible");
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    const shapes = document.querySelectorAll(".floating-shape");
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      shapes.forEach((shape, i) => {
        const factor = (i + 1) * 10;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleClear = () => {
    setText("");
    setCharCount(0);
  };

  return (
    <div className="App">
      <SplashCursor />

      {/* ==== HEADER ==== */}
      <header>
        <div className="container header-content">
          <div className="logo">
            <div className="logo-icon">
              <FontAwesomeIcon icon={faPenFancy} />
            </div>
            <span className="logo-text">Scriptura</span>
          </div>
        </div>
      </header>

      {/* ==== Floating Background Shapes ==== */}
      <div className="floating-shape shape-pen" style={{ top: "10%", left: "15%" }}></div>
      <div className="floating-shape shape-ink" style={{ top: "40%", left: "70%" }}></div>
      <div className="floating-shape shape-scroll" style={{ top: "75%", left: "30%" }}></div>
      <div className="floating-shape shape-pen" style={{ top: "20%", left: "85%" }}></div>
      <div className="floating-shape shape-ink" style={{ top: "60%", left: "50%" }}></div>

      {/* ==== HERO ==== */}
      <section className="hero">
        <h1>Transform Text into Elegant Handwriting</h1>
        <p>
          Experience the art of words written by AI — natural, expressive, and
          beautifully crafted.
        </p>
      </section>

      {/* ==== GENERATOR ==== */}
      <section className="generator-content container">
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <FontAwesomeIcon icon={faPenFancy} />
            </div>
            <div className="card-title">Enter Your Text</div>
          </div>
          <textarea
            value={text}
            onChange={handleTextChange}
            maxLength={500}
            placeholder="Type your message here..."
          />
          <div className="char-count">{charCount} / 500</div>
          <div className="action-buttons">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faMagic} /> Generate
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              <FontAwesomeIcon icon={faUndo} /> Clear
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <FontAwesomeIcon icon={faScroll} />
            </div>
            <div className="card-title">Handwriting Preview</div>
          </div>
          <div className="preview-box">
            {text ? (
              <div className="preview-text">
                {text.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{ animationDelay: `${index * 0.04}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ) : (
              "Your handwriting preview will appear here..."
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
