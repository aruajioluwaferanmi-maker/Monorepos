import React, { useState, useEffect } from "react";
import HeroText from "./HeroText";
import ProfileCard from "./ProfileCard";
import { HeroConfig } from "../../types/hero.types";

interface HeroSectionProps {
  onDeliverProject: () => void;
  onMentorMe: () => void;
  onCoffeeWithMe: () => void;
  onFifteenMinChat: () => void;
  onAuditWebsite: () => void;
  onTechCatchUp: () => void;
  onWorkWithMeClick: () => void;
  onHelpMeFreeClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onDeliverProject,
  onMentorMe,
  onCoffeeWithMe,
  onFifteenMinChat,
  onAuditWebsite,
  onTechCatchUp,
  onWorkWithMeClick,
  onHelpMeFreeClick,
}) => {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../config/hero.json").then((data) => {
      setConfig(data.default as HeroConfig);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-white pt-16">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4 animate-pulse pt-16 lg:pt-20">
              <div className="h-5 bg-gray-100 rounded-full w-52" />
              <div className="h-14 bg-gray-100 rounded-xl w-full" />
              <div className="h-14 bg-gray-100 rounded-xl w-4/5" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="flex gap-3 mt-2">
                <div className="h-12 bg-gray-100 rounded-xl w-44" />
                <div className="h-12 bg-gray-100 rounded-xl w-36" />
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-10 lg:pt-14">
              <div className="h-80 bg-gray-100 rounded-2xl animate-pulse w-full" />
              <div className="h-48 bg-gray-100 rounded-2xl animate-pulse w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!config) return null;

  return (
    <section className="min-h-screen bg-white pt-16">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="
          grid grid-cols-1 lg:grid-cols-2
          gap-8 lg:gap-12
          items-start
        "
        >
          {/* Left — Hero Text */}
          <div
            className="
            flex flex-col justify-start
            pt-16 lg:pt-20 pb-12
          "
          >
            <HeroText
              config={config}
              onDeliverProject={onDeliverProject}
              onMentorMe={onMentorMe}
              onCoffeeWithMe={onCoffeeWithMe}
              onFifteenMinChat={onFifteenMinChat}
              onAuditWebsite={onAuditWebsite}
              onTechCatchUp={onTechCatchUp}
              onWorkWithMeClick={onWorkWithMeClick}
              onHelpMeFreeClick={onHelpMeFreeClick}
            />
          </div>

          {/* Right — Profile Card fills full column */}
          <div
            className="
            flex flex-col
            pt-10 lg:pt-14 pb-12
            gap-4 w-full
          "
          >
            <ProfileCard profile={config.profile} funFacts={config.funFacts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
