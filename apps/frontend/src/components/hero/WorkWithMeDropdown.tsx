import React, { useState, useRef, useEffect } from "react";

interface WorkWithMeDropdownProps {
  onDeliverProject: () => void;
  onMentorMe: () => void;
  onCoffeeWithMe: () => void;
  onDropdownClick: () => void; // Slice 8 — fires cta_work_with_me
}

const options = [
  {
    id: "deliver",
    icon: "🚀",
    label: "Deliver a Project",
    desc: "Let's build something together",
  },
  {
    id: "mentor",
    icon: "🎓",
    label: "Mentor Me",
    desc: "Level up your skills",
  },
  {
    id: "coffee",
    icon: "☕",
    label: "Coffee With Me",
    desc: "Just a casual chat",
  },
];

const WorkWithMeDropdown: React.FC<WorkWithMeDropdownProps> = ({
  onDeliverProject,
  onMentorMe,
  onCoffeeWithMe,
  onDropdownClick,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    // Slice 8 — fire Work With Me CTA click
    if (!open) onDropdownClick();
    setOpen((prev) => !prev);
  };

  const handleOption = (id: string) => {
    setOpen(false);
    if (id === "deliver") onDeliverProject();
    if (id === "mentor") onMentorMe();
    if (id === "coffee") onCoffeeWithMe();
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className="
          flex items-center gap-2
          px-7 py-4
          bg-blue-600 hover:bg-blue-700
          text-white font-bold text-sm
          rounded-xl
          shadow-lg shadow-blue-200
          hover:shadow-xl hover:shadow-blue-300
          hover:-translate-y-0.5
          transition-all duration-200
          whitespace-nowrap
        "
      >
        💼 Work With Me
        <span
          className={`
            text-xs transition-transform duration-200
            ${open ? "rotate-180" : ""}
          `}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
          absolute top-full left-0 mt-2
          bg-white rounded-2xl shadow-2xl
          border border-gray-100
          w-64 overflow-hidden z-50
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

export default WorkWithMeDropdown;
