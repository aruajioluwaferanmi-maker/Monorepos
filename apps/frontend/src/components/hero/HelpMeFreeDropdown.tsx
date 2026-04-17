import React, { useState, useRef, useEffect } from "react";

interface HelpMeFreeDropdownProps {
  onFifteenMinChat: () => void;
  onAuditWebsite: () => void;
  onTechCatchUp: () => void;
  onDropdownClick: () => void;
}

const options = [
  {
    id: "fifteen",
    icon: "⏱️",
    label: "15 Minutes Chat",
    desc: "Quick free call — no agenda",
  },
  {
    id: "audit",
    icon: "🔍",
    label: "Audit My Website",
    desc: "Free honest website review",
  },
  {
    id: "catchup",
    icon: "👥",
    label: "1-2-Many Tech Catch Up",
    desc: "Group tech learning session",
  },
];

const HelpMeFreeDropdown: React.FC<HelpMeFreeDropdownProps> = ({
  onFifteenMinChat,
  onAuditWebsite,
  onTechCatchUp,
  onDropdownClick,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleToggle = () => {
    if (!open) onDropdownClick();
    setOpen((prev) => !prev);
  };

  const handleOption = (id: string) => {
    setOpen(false);
    if (id === "fifteen") onFifteenMinChat();
    if (id === "audit") onAuditWebsite();
    if (id === "catchup") onTechCatchUp();
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className="
          flex items-center gap-2
          px-6 py-3.5
          border-2 border-blue-600
          text-blue-600 font-bold text-sm
          rounded-xl
          hover:bg-blue-50
          hover:-translate-y-0.5
          transition-all duration-200
          whitespace-nowrap
          bg-white
        "
      >
        🙌 Help Me Free
        <span
          className={`
            text-xs transition-transform duration-200
            ${open ? "rotate-180" : ""}
          `}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="
          absolute top-full left-0 mt-2
          bg-white rounded-2xl shadow-2xl
          border border-gray-100
          w-68 overflow-hidden z-50
        "
        >
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOption(option.id)}
              className="
                w-full flex items-center gap-4
                px-5 py-4
                hover:bg-blue-50
                transition-colors duration-150
                text-left
                border-b border-gray-50
                last:border-b-0
              "
            >
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">
                  {option.label}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{option.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpMeFreeDropdown;
