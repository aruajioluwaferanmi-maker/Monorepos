import React from "react";

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl border
          text-gray-800 text-sm
          outline-none transition-all duration-200
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          resize-none
          ${
            error
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
          }
        `}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;
