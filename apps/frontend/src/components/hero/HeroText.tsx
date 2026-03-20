import React from "react";
import { Button } from "@mui/material";
import { HeroConfig } from "../../types/hero.types";

interface HeroTextProps {
  config: HeroConfig;
  onWorkClick: () => void;
  onConnectClick: () => void;
}

const HeroText: React.FC<HeroTextProps> = ({
  config,
  onWorkClick,
  onConnectClick,
}) => {
  return (
    <div className="flex flex-col gap-6 justify-center">
      {/* Subheading Badge */}
      <span
        className="
        inline-block w-fit
        bg-blue-50 text-blue-600
        text-sm font-semibold
        px-4 py-2 rounded-full
        border border-blue-200
      "
      >
        {config.subheading}
      </span>

      {/* Main Heading */}
      <h1
        className="
        text-4xl lg:text-5xl
        font-extrabold
        text-gray-900
        leading-tight
      "
      >
        {config.heading}
      </h1>

      {/* Intro Paragraph */}
      <p
        className="
        text-lg text-gray-600
        leading-relaxed
        max-w-xl
      "
      >
        {config.intro}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 mt-2">
        <Button
          variant="contained"
          size="large"
          onClick={onWorkClick}
          sx={{
            backgroundColor: "#2563eb",
            borderRadius: "12px",
            padding: "12px 28px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#1d4ed8",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
            },
            transition: "all 0.2s ease",
          }}
        >
          {config.ctas.work.label}
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={onConnectClick}
          sx={{
            borderColor: "#2563eb",
            color: "#2563eb",
            borderRadius: "12px",
            padding: "12px 28px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            borderWidth: "2px",
            "&:hover": {
              borderColor: "#1d4ed8",
              backgroundColor: "#eff6ff",
              transform: "translateY(-2px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          {config.ctas.connect.label}
        </Button>
      </div>
    </div>
  );
};

export default HeroText;
