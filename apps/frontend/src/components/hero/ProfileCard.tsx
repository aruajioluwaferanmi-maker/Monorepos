import React from "react";
import { HeroProfile, FunFact } from "../../types/hero.types";

interface ProfileCardProps {
  profile: HeroProfile;
  funFacts: FunFact[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, funFacts }) => {
  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      {/* Work Profile Card */}
      <div
        className="
        bg-white rounded-2xl shadow-xl p-8
        flex flex-col items-center gap-5
        border border-gray-100
        hover:shadow-2xl transition-shadow duration-300
      "
      >
        {/* Avatar */}
        <div className="relative">
          <img
            src={profile.image}
            alt={profile.name}
            className="
              w-28 h-28 rounded-full
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
            absolute bottom-1 right-1
            bg-green-500 text-white
            text-xs font-bold
            px-2 py-0.5 rounded-full
            border-2 border-white
          "
          >
            ● {profile.badge}
          </span>
        </div>

        {/* Name + Role */}
        <div className="text-center">
          <h3 className="text-xl font-extrabold text-gray-800">
            {profile.name}
          </h3>
          <p className="text-blue-600 font-semibold text-sm mt-1">
            {profile.role}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100" />

        {/* Stats */}
        <div className="flex justify-around w-full">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-gray-800">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts Card */}
      <div
        className="
        bg-gradient-to-br from-blue-50 to-indigo-50
        rounded-2xl p-6
        border border-blue-100
      "
      >
        <h4
          className="
          text-sm font-bold text-blue-700
          mb-4 flex items-center gap-2
        "
        >
          ✨ Fun Facts
        </h4>
        <div className="flex flex-col gap-3">
          {funFacts.map((fact, index) => (
            <div
              key={index}
              className="
                flex items-start gap-3
                bg-white rounded-xl p-3
                border border-blue-100
                shadow-sm
              "
            >
              <span className="text-xl flex-shrink-0">{fact.emoji}</span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {fact.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
