import React from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [location, setLocation] = useLocation(); // ✅ Get current route & navigation function

  // ✅ Handle scrolling correctly
  const handleScrollToAlgorithms = () => {
    if (location !== "/") {
      setLocation("/"); // ✅ Navigate to Home first
      setTimeout(() => {
        const element = document.querySelector(".home-title");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 500); // ⏳ Delay scrolling until Home loads
    } else {
      const element = document.querySelector(".home-title");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DSA Visualizer</h2>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li onClick={handleScrollToAlgorithms}>Algorithms</li> {/* ✅ Fixed scroll behavior */}
        <li><Link href="/race">Race Mode</Link></li>
        <li><Link href="/about">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Header;