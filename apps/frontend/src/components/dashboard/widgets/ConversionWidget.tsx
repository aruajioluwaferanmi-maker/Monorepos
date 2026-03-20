import React from "react";

interface ConversionWidgetProps {
  ctr: string;
  modalRate: string;
  loading?: boolean;
}

const ConversionWidget: React.FC<ConversionWidgetProps> = ({
  ctr,
  modalRate,
  loading,
}) => {
  if (loading) {
    return (
      <div
        className="
        bg-white rounded-2xl p-6
        border border-gray-100 shadow-sm
        animate-pulse
      "
      >
        <div className="w-32 h-5 bg-gray-200 rounded mb-4" />
        <div className="flex gap-6">
          <div className="w-24 h-16 bg-gray-200 rounded-xl" />
          <div className="w-24 h-16 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      bg-white rounded-2xl p-6
      border border-gray-100 shadow-sm
    "
    >
      <h3 className="text-gray-700 font-bold text-sm mb-4">
        📈 Conversion Rates
      </h3>

      <div className="flex gap-4">
        {/* CTR */}
        <div
          className="
          flex-1 bg-blue-50 rounded-xl p-4
          border border-blue-100
        "
        >
          <p className="text-2xl font-extrabold text-blue-600">{ctr}</p>
          <p className="text-xs text-blue-500 font-medium mt-1">
            CTA Click Rate
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Clicks / Page Views</p>
        </div>

        {/* Modal Rate */}
        <div
          className="
          flex-1 bg-green-50 rounded-xl p-4
          border border-green-100
        "
        >
          <p className="text-2xl font-extrabold text-green-600">{modalRate}</p>
          <p className="text-xs text-green-500 font-medium mt-1">
            Modal Convert Rate
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Submits / Modal Opens</p>
        </div>
      </div>
    </div>
  );
};

export default ConversionWidget;
