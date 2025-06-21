import React from "react";
import type { ParabolaParameters, EllipseParameters } from "../types";

interface ParameterControlsProps {
  conicType: string;
  parabolaParams: ParabolaParameters;
  ellipseParams: EllipseParameters;
  onParabolaChange: (params: Partial<ParabolaParameters>) => void;
  onEllipseChange: (params: Partial<EllipseParameters>) => void;
  darkMode: boolean;
}

export const ParameterControls: React.FC<ParameterControlsProps> = ({
  conicType,
  parabolaParams,
  ellipseParams,
  onParabolaChange,
  onEllipseChange,
  darkMode,
}) => {
  const cardClasses = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  const textClasses = darkMode ? "text-gray-400" : "text-gray-500";

  if (conicType === "parabola") {
    return (
      <div className="space-y-4 mb-6">
        <div className={`p-4 rounded-lg border ${cardClasses}`}>
          <label className="block text-sm font-medium mb-2">
            Parameter 'a' (width/direction): {parabolaParams.a}
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={parabolaParams.a}
            onChange={(e) =>
              onParabolaChange({ a: parseFloat(e.target.value) })
            }
            className="w-full focus-visible-ring"
            aria-label="Parameter a controls width and direction"
          />
          <div className={`text-xs mt-1 ${textClasses}`}>
            Positive: opens up, Negative: opens down
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${cardClasses}`}>
          <label className="block text-sm font-medium mb-2">
            Parameter 'h' (horizontal shift): {parabolaParams.h}
          </label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.5"
            value={parabolaParams.h}
            onChange={(e) =>
              onParabolaChange({ h: parseFloat(e.target.value) })
            }
            className="w-full focus-visible-ring"
            aria-label="Parameter h controls horizontal shift"
          />
          <div className={`text-xs mt-1 ${textClasses}`}>
            Moves vertex left/right
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${cardClasses}`}>
          <label className="block text-sm font-medium mb-2">
            Parameter 'k' (vertical shift): {parabolaParams.k}
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={parabolaParams.k}
            onChange={(e) =>
              onParabolaChange({ k: parseFloat(e.target.value) })
            }
            className="w-full focus-visible-ring"
            aria-label="Parameter k controls vertical shift"
          />
          <div className={`text-xs mt-1 ${textClasses}`}>
            Moves vertex up/down
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <div className={`p-4 rounded-lg border ${cardClasses}`}>
        <label className="block text-sm font-medium mb-2">
          Parameter 'a' (
          {conicType === "ellipse"
            ? "horizontal radius"
            : conicType === "circle"
              ? "radius"
              : "horizontal scale"}
          ): {ellipseParams.a}
        </label>
        <input
          type="range"
          min="0.5"
          max="8"
          step="0.5"
          value={ellipseParams.a}
          onChange={(e) => onEllipseChange({ a: parseFloat(e.target.value) })}
          className="w-full focus-visible-ring"
          aria-label={`Parameter a controls ${conicType === "circle" ? "radius" : "horizontal scale"}`}
        />
      </div>

      {conicType !== "circle" && (
        <div className={`p-4 rounded-lg border ${cardClasses}`}>
          <label className="block text-sm font-medium mb-2">
            Parameter 'b' (
            {conicType === "ellipse" ? "vertical radius" : "vertical scale"}):{" "}
            {ellipseParams.b}
          </label>
          <input
            type="range"
            min="0.5"
            max="8"
            step="0.5"
            value={ellipseParams.b}
            onChange={(e) => onEllipseChange({ b: parseFloat(e.target.value) })}
            className="w-full focus-visible-ring"
            aria-label={`Parameter b controls ${conicType === "ellipse" ? "vertical radius" : "vertical scale"}`}
          />
        </div>
      )}

      <div className={`p-4 rounded-lg border ${cardClasses}`}>
        <label className="block text-sm font-medium mb-2">
          Parameter 'h' (horizontal shift): {ellipseParams.h}
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.5"
          value={ellipseParams.h}
          onChange={(e) => onEllipseChange({ h: parseFloat(e.target.value) })}
          className="w-full focus-visible-ring"
          aria-label="Parameter h controls horizontal shift"
        />
      </div>

      <div className={`p-4 rounded-lg border ${cardClasses}`}>
        <label className="block text-sm font-medium mb-2">
          Parameter 'k' (vertical shift): {ellipseParams.k}
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.5"
          value={ellipseParams.k}
          onChange={(e) => onEllipseChange({ k: parseFloat(e.target.value) })}
          className="w-full focus-visible-ring"
          aria-label="Parameter k controls vertical shift"
        />
      </div>
    </div>
  );
};
