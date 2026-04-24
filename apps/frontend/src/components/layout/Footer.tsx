import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialIcon from "../ui/SocialIcon";
import { FooterConfig } from "../../types/navbar.types";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<FooterConfig | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    import("../../config/footer.json").then((data) => {
      setConfig(data.default as FooterConfig);
    });
  }, []);

  if (!config) return null;

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      // Scroll to section
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <footer
      className="
      w-full bg-white
      border-t border-gray-100
    "
    >
      <div
        className="
        max-w-7xl mx-auto
        px-6 lg:px-12
        py-12
      "
      >
        {/* Top Row */}
        <div
          className="
          grid grid-cols-1 md:grid-cols-3
          gap-10 mb-10
        "
        >
          {/* Left — Brand */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="
                w-9 h-9 rounded-xl
                bg-gradient-to-br from-blue-600 to-indigo-600
                flex items-center justify-center
                text-white font-extrabold text-sm
                shadow-md shadow-blue-100
                flex-shrink-0
              "
              >
                {config.initials}
              </div>
              <span
                className="
                font-bold text-base
                text-gray-800 tracking-tight
              "
              >
                {config.name}
              </span>
            </div>

            {/* Tagline */}
            <p
              className="
              text-sm text-gray-400
              leading-relaxed max-w-xs
            "
            >
              {config.tagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-1">
              {config.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    w-9 h-9 rounded-xl
                    bg-gray-50 hover:bg-blue-50
                    border border-gray-200 hover:border-blue-200
                    flex items-center justify-center
                    text-gray-400 hover:text-blue-600
                    transition-all duration-200
                    hover:-translate-y-0.5
                  "
                >
                  <SocialIcon icon={social.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Middle — Quick Links */}
          {/* <div className="flex flex-col gap-4">
            <h4
              className="
              text-xs font-bold text-gray-400
              uppercase tracking-widest
            "
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {config.quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="
                      text-sm text-gray-500
                      hover:text-blue-600
                      transition-colors duration-150
                      bg-transparent border-none
                      cursor-pointer text-left
                      font-medium
                    "
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Right — Get In Touch */}
          <div className="flex flex-col gap-4">
            <h4
              className="
              text-xs font-bold text-gray-400
              uppercase tracking-widest
            "
            >
              Get In Touch
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Open to projects, mentorship, collaborations and conversations.
            </p>

            {/* CTA */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="
                w-fit flex items-center gap-2
                px-5 py-2.5
                bg-blue-600 hover:bg-blue-700
                text-white font-bold text-xs
                rounded-xl
                transition-all duration-200
                hover:shadow-md hover:-translate-y-0.5
              "
            >
              💼 Work With Me
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 mb-6" />

        {/* Bottom Row — Copyright */}
        <div
          className="
          flex flex-col sm:flex-row
          items-center justify-between
          gap-3
        "
        >
          <p className="text-xs text-gray-400">
            © {currentYear} {config.copyright}
          </p>
          <p className="text-xs text-gray-300">
            Built with React · TypeScript · TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
