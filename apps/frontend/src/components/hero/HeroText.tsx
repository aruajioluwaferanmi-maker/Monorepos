import React from "react";
import { HeroConfig } from "../../types/hero.types";
import WorkWithMeDropdown from "./WorkWithMeDropdown";
import HelpMeFreeDropdown from "./HelpMeFreeDropdown";

interface HeroTextProps {
  config: HeroConfig;
  onDeliverProject: () => void;
  onMentorMe: () => void;
  onCoffeeWithMe: () => void;
  onFifteenMinChat: () => void;
  onAuditWebsite: () => void;
  onTechCatchUp: () => void;
  onWorkWithMeClick: () => void;
  onHelpMeFreeClick: () => void;
}

const HeroText: React.FC<HeroTextProps> = ({
  config,
  onDeliverProject,
  onMentorMe,
  onCoffeeWithMe,
  onFifteenMinChat,
  onAuditWebsite,
  onTechCatchUp,
  onWorkWithMeClick,
  onHelpMeFreeClick,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Subheading Badge */}
      <span
        className="
        inline-flex items-center w-fit
        bg-blue-50 text-blue-600
        text-sm font-semibold
        px-4 py-1.5 rounded-full
        border border-blue-100
      "
      >
        {config.subheading}
      </span>

      {/* Heading */}
      <h1
        className="
        text-4xl lg:text-5xl xl:text-6xl
        font-extrabold text-gray-900
        leading-[1.1] tracking-tight
      "
      >
        {config.heading}
      </h1>

      {/* Intro */}
      <p
        className="
        text-base lg:text-lg
        text-gray-500 leading-relaxed
        max-w-lg
      "
      >
        {config.intro}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {/* Work With Me Dropdown */}
        <WorkWithMeDropdown
          onDeliverProject={onDeliverProject}
          onMentorMe={onMentorMe}
          onCoffeeWithMe={onCoffeeWithMe}
          onDropdownClick={onWorkWithMeClick}
        />

        {/* Help Me Free Dropdown */}
        <HelpMeFreeDropdown
          onFifteenMinChat={onFifteenMinChat}
          onAuditWebsite={onAuditWebsite}
          onTechCatchUp={onTechCatchUp}
          onDropdownClick={onHelpMeFreeClick}
        />
      </div>
    </div>
  );
};

export default HeroText;
