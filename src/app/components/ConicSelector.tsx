import React from "react";

interface ConicSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  darkMode: boolean;
}

export const ConicSelector: React.FC<ConicSelectorProps> = ({
  selectedType,
  onTypeChange,
  darkMode,
}) => {
  const types = ["parabola", "circle", "ellipse", "hyperbola"];

  return (
    <div
      className={`flex rounded-lg p-1 w-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
    >
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedType === type
              ? darkMode
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white text-gray-900 shadow-sm"
              : darkMode
                ? "text-gray-300 hover:text-white hover:bg-gray-600"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};
