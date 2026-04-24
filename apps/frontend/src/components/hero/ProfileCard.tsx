import React from "react";
import { HeroProfile, FunFact } from "../../types/hero.types";

interface ProfileCardProps {
  profile: HeroProfile;
  funFacts: FunFact[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, funFacts }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Work Profile Card — full width */}
      <div
        className="
        bg-white rounded-2xl
        shadow-[0_4px_40px_rgba(0,0,0,0.08)]
        border border-gray-100
        p-8 w-full
        flex flex-col items-center gap-5
      "
      >
        {/* Avatar + Badge */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={profile.image}
            alt={profile.name}
            className="
              w-24 h-24 rounded-full
              object-cover
              border-4 border-blue-500
            "
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(profile.name) +
                "&background=2563eb&color=fff&size=128";
            }}
          />
          <span
            className="
            inline-flex items-center gap-1.5
            bg-green-500 text-white
            text-xs font-bold
            px-3 py-1 rounded-full
          "
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            {profile.badge}
          </span>
        </div>

        {/* Name + Role */}
        <div className="text-center">
          <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
            {profile.name}
          </h3>
          <p className="text-blue-600 font-semibold text-sm mt-1">
            {profile.role}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100" />

        {/* Stats — spaced evenly across full width */}
        <div className="grid grid-cols-3 w-full text-center gap-4">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-extrabold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts — full width */}
      <div
        className="
        bg-blue-50 rounded-2xl
        border border-blue-100
        p-6 w-full
      "
      >
        <h4
          className="
          text-sm font-bold text-blue-700
          mb-3 flex items-center gap-2
        "
        >
          ✨ Fun Facts
        </h4>
        <div className="flex flex-col gap-2">
          {funFacts.map((fact, index) => (
            <div
              key={index}
              className="
                flex items-center gap-3
                bg-white rounded-xl
                px-4 py-3
                border border-blue-50 shadow-sm
              "
            >
              <span className="text-lg flex-shrink-0">{fact.emoji}</span>
              <p className="text-sm text-gray-600 leading-snug">{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
