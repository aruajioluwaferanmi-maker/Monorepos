import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarConfig } from "../../types/navbar.types";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<NavbarConfig | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    import("../../config/navbar.json").then((data) => {
      setConfig(data.default as NavbarConfig);
    });
  }, []);

  // Handle scroll — glass effect + hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Become glassy after 10px
      setScrolled(currentY > 10);

      // Hide navbar when scrolling down
      // show when scrolling up
      if (currentY > lastScrollY && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20"
            : "bg-white/10 backdrop-blur-md border-b border-white/10"
        }
      `}
    >
      <div
        className="
        max-w-7xl mx-auto
        px-6 h-16
        flex items-center justify-between
      "
      >
        {/* Left — Logo */}
        <button
          onClick={() => navigate(config?.logo.href || "/")}
          className="
            flex items-center gap-3
            group cursor-pointer
            bg-transparent border-none outline-none
          "
        >
          {/* Initials Badge */}
          <div
            className="
            w-9 h-9 rounded-xl
            bg-gradient-to-br from-blue-600 to-indigo-600
            flex items-center justify-center
            text-white font-extrabold text-sm
            shadow-md shadow-blue-200
            group-hover:scale-105
            group-hover:shadow-lg group-hover:shadow-blue-300
            transition-all duration-200
            flex-shrink-0
          "
          >
            {config?.logo.initials || "OA"}
          </div>

          {/* Full Name */}
          <span
            className="
            font-bold text-base
            text-gray-800
            group-hover:text-blue-600
            transition-colors duration-200
            tracking-tight
            whitespace-nowrap
          "
          >
            {config?.logo.fullName || "Oluwaferanmi Aruaji"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
