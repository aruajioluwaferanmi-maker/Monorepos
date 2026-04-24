import React from "react";
import { PricingTier } from "../../types/hero.types";

interface PricingCardsProps {
  tiers: PricingTier[];
  selectedTier: string;
  onSelect: (tier: string) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  tiers,
  selectedTier,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-gray-700 mb-1">Select a Plan</p>

      <div className="grid grid-cols-3 gap-3">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.tier;
          const isRecommended = tier.recommended;

          return (
            <button
              key={tier.tier}
              onClick={() => onSelect(tier.tier)}
              className={`
                relative flex flex-col
                rounded-2xl p-4 text-left
                border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                }
              `}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <span
                  className="
                  absolute -top-3 left-1/2 -translate-x-1/2
                  bg-blue-600 text-white
                  text-xs font-bold
                  px-3 py-0.5 rounded-full
                  whitespace-nowrap
                "
                >
                  ✨ Popular
                </span>
              )}

              {/* Selected Indicator */}
              <div
                className={`
                w-4 h-4 rounded-full border-2
                ml-auto mb-2 flex-shrink-0
                transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300 bg-white"
                }
              `}
              >
                {isSelected && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* Tier Name */}
              <p
                className={`
                text-sm font-extrabold
                ${isSelected ? "text-blue-700" : "text-gray-800"}
              `}
              >
                {tier.tier}
              </p>

              {/* Price */}
              <p
                className={`
                text-xl font-extrabold mt-1
                ${isSelected ? "text-blue-600" : "text-gray-900"}
              `}
              >
                {tier.price}
              </p>

              {/* Description */}
              <p className="text-xs text-gray-400 mt-1 leading-snug">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="mt-3 flex flex-col gap-1.5">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span
                      className={`
                      text-xs flex-shrink-0 mt-0.5
                      ${isSelected ? "text-blue-500" : "text-gray-400"}
                    `}
                    >
                      ✓
                    </span>
                    <span className="text-xs text-gray-600 leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Validation error */}
      {!selectedTier && (
        <p className="text-red-500 text-xs mt-1">
          Please select a plan to continue
        </p>
      )}
    </div>
  );
};

export default PricingCards;
