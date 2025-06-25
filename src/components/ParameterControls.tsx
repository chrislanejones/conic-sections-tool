"use client";

import React from "react";
import { ConicType } from "@/types";

export interface ParameterValues {
  a: number;
  b: number;
  h: number;
  k: number;
}

export interface ParameterControlsProps {
  conicType: ConicType;
  params: ParameterValues;
  onChange: (params: ParameterValues) => void;
}

export function ParameterControls({
  conicType,
  params,
  onChange,
}: ParameterControlsProps) {
  const handleChange = (key: keyof ParameterValues, value: number) => {
    console.log(`⚙️ Parameter ${key} changed to:`, value);
    const newParams = { ...params, [key]: value };
    onChange(newParams);
  };

  const getParameterLabel = (param: string) => {
    switch (param) {
      case "a":
        return conicType === "circle" ? "Radius (r)" : "Semi-major axis (a)";
      case "b":
        return "Semi-minor axis (b)";
      case "h":
        return "Horizontal shift (h)";
      case "k":
        return "Vertical shift (k)";
      default:
        return param.toUpperCase();
    }
  };

  const getParameterDescription = (param: string) => {
    switch (param) {
      case "a":
        return conicType === "circle"
          ? "Controls the radius of the circle"
          : "Controls the width of the shape";
      case "b":
        return "Controls the height of the shape";
      case "h":
        return "Moves the shape left or right";
      case "k":
        return "Moves the shape up or down";
      default:
        return "";
    }
  };

  const shouldShowParameter = (param: string) => {
    if (conicType === "circle" && param === "b") return false;
    if (conicType === "parabola" && param === "b") return false;
    return true;
  };

  return (
    <div className="space-y-4 mb-6">
      {["a", "b", "h", "k"].map((param) => {
        if (!shouldShowParameter(param)) return null;

        return (
          <div
            key={param}
            className="p-4 rounded-lg border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-card-foreground">
                {getParameterLabel(param)}
              </label>
              <span className="text-sm text-muted-foreground font-mono">
                {params[param as keyof ParameterValues].toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={param === "h" || param === "k" ? -10 : 0.1}
              max={10}
              step={0.1}
              value={params[param as keyof ParameterValues]}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                handleChange(param as keyof ParameterValues, value);
              }}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {getParameterDescription(param)}
            </p>
          </div>
        );
      })}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          border: 2px solid hsl(var(--background));
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          border: 2px solid hsl(var(--background));
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
