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
    <div className="mb-6">
      <div
        className={`flex rounded-lg p-1 w-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`conic-button flex-1 ${
              selectedType === type
                ? "conic-button-active"
                : "conic-button-inactive"
            } ${darkMode && selectedType === type ? "bg-gray-900 text-white" : ""} 
            ${darkMode && selectedType !== type ? "text-gray-300 hover:text-white hover:bg-gray-600" : ""}
            ${!darkMode && selectedType === type ? "bg-white text-gray-900" : ""}
            ${!darkMode && selectedType !== type ? "text-gray-500 hover:text-gray-900 hover:bg-gray-50" : ""}`}
            aria-pressed={selectedType === type}
            role="tab"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div
        className={`text-center mt-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Conic
        Type
      </div>
    </div>
  );
};
