import React, { useState, useEffect } from "react";
import HeroText from "./HeroText";
import ProfileCard from "./ProfileCard";
import { HeroConfig } from "../../types/hero.types";

interface HeroSectionProps {
  onWorkClick: () => void;
  onConnectClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onWorkClick,
  onConnectClick,
}) => {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../config/hero.json").then((data) => {
      setConfig(data.default as HeroConfig);
      setLoading(false);
    });
  }, []);

  // Skeleton loader while config loads
  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded-full w-48" />
              <div className="h-12 bg-gray-200 rounded-xl w-full" />
              <div className="h-12 bg-gray-200 rounded-xl w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="flex gap-4 mt-4">
                <div className="h-12 bg-gray-200 rounded-xl w-40" />
                <div className="h-12 bg-gray-200 rounded-xl w-40" />
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!config) return null;

  return (
    <section
      className="
      min-h-screen
      bg-gradient-to-br from-blue-50 via-white to-indigo-50
      flex items-center
    "
    >
      <div className="container mx-auto px-6 py-20">
        <div
          className="
          grid grid-cols-1 lg:grid-cols-2
          gap-16 items-center
        "
        >
          {/* Left — Hero Text */}
          <HeroText
            config={config}
            onWorkClick={onWorkClick}
            onConnectClick={onConnectClick}
          />

          {/* Right — Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <ProfileCard profile={config.profile} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
