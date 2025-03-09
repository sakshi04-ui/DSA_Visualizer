import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring"; // ✅ Animation support
import Header from "../components/Header"; // ✅ Import Header
import "../styles/Home.css";
import { Link } from "wouter"; 
// ✅ Import Link for navigation
import ThreeJSBackground from "../components/ThreeJSBackground"; // ✅ Import Three.js background

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const typingText = "Welcome to the DSA Visualizer!"; // ✅ Typing effect text

  // ✅ Typing Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentText(typingText.slice(0, i));
      i++;
      if (i > typingText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // ✅ Animations
  const welcomeSpring = useSpring({
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(-50px)",
    config: { duration: 800 },
  });

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  return (
    <div className="home-container">
      {/* Three.js Background */}
      <ThreeJSBackground /> {/* ✅ Added ThreeJS background here */}

      <Header /> {/* ✅ Now using the Header component */}

      {/* ✅ Hero Section with Background Video */}
      <div className="hero-section">
        <video autoPlay muted loop className="background-video">
          <source src="/assets/video/algo.webm" type="video/webm" />
          <source src="/assets/video/algo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <animated.div style={welcomeSpring} className="hero-content">
          <h1 className="hero-title">{currentText}</h1>
          <p className="hero-subtitle">
            Visualize algorithms with real-time execution and interactive demos!
          </p>
          <button
            className="get-started-btn"
            onClick={() =>
              document.querySelector(".home-title").scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started
          </button>
        </animated.div>
      </div>

      {/* ✅ Algorithms Section */}
      <h2 className="home-title">Explore Our Interactive Data Structures Visualizer!</h2>
      <div className="categories-container">
        
        {/* ✅ Searching Algorithms */}
        <div className="category-card">
          <div className="icon hash-table-icon"></div>
          <h3>Searching Algo</h3>
          <p>Linear Search, Binary Search</p>
          <Link href="/searching">
            <button className="explore-btn">Explore</button>
          </Link> {/* ✅ Navigates to Searching.js */}
        </div>

        {/* ✅ Sorting Algorithms */}
        <div className="category-card">
          <div className="icon sorting-icon"></div>
          <h3>Sorting Algo</h3>
          <p>Bubble, Selection, Insertion</p>
          <Link href="/sorting">
            <button className="explore-btn">Explore</button>
          </Link> {/* ✅ Navigates to Sorting.js */}
        </div>

        {/* ✅ Trees */}
        <div className="category-card">
          <div className="icon trees-icon"></div>
          <h3>Trees</h3>
          <p>Tree Traversals</p>
          <Link href="/trees">
            <button className="explore-btn">Explore</button>
          </Link> {/* ✅ Add a Trees.js if needed */}
        </div>

        {/* ✅ Linked Lists */}
        <div className="category-card">
          <div className="icon linked-lists-icon"></div>
          <h3>Linked Lists</h3>
          <p>Singly Linked List</p>
          <Link href="/linked-lists">
            <button className="explore-btn">Explore</button>
          </Link> {/* ✅ Add a LinkedLists.js if needed */}
        </div>
      </div>

      {/* ✅ Video Section */}
      <div className="video-section">
        <h2 className="features-title">Watch Tutorials</h2>
        <div className="videos-container">
          <div className={`video ${fadeIn ? "fade-in" : ""}`}>
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/9_B6TmAHveU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className={`video ${fadeIn ? "fade-in" : ""}`}>
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/0Hwpzd-bSck"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className={`video ${fadeIn ? "fade-in" : ""}`}>
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/CE150x4w0bo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
