import React from "react";
import { HeroProfile } from "../../types/hero.types";

interface ProfileCardProps {
  profile: HeroProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div
      className="
      bg-white rounded-2xl shadow-xl p-8
      flex flex-col items-center gap-4
      border border-gray-100
      hover:shadow-2xl transition-shadow duration-300
    "
    >
      {/* Profile Image */}
      <div className="relative">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(profile.name) +
              "&background=3b82f6&color=fff&size=128";
          }}
        />
        {/* Online Badge */}
        <span
          className="
          absolute bottom-2 right-2
          bg-green-500 text-white
          text-xs font-semibold
          px-2 py-1 rounded-full
        "
        >
          {profile.badge}
        </span>
      </div>

      {/* Profile Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
        <p className="text-blue-600 font-medium mt-1">{profile.role}</p>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-100" />

      {/* Stats Row */}
      <div className="flex justify-around w-full">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">5+</p>
          <p className="text-xs text-gray-500">Projects</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">3+</p>
          <p className="text-xs text-gray-500">Years Exp</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">10+</p>
          <p className="text-xs text-gray-500">Clients</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
