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

  const shouldShowParameter = (param: string) => {
    if (conicType === "circle" && param === "b") return false;
    if (conicType === "parabola" && param === "b") return false;
    return true;
  };

  return (
    <div className="space-y-4">
      {["a", "b", "h", "k"].map((param) => {
        if (!shouldShowParameter(param)) return null;

        const value = params[param as keyof ParameterValues];
        const min = param === "h" || param === "k" ? -10 : 0.1;

        return (
          <div key={param} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                {getParameterLabel(param)}
              </label>
              <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                {value.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={10}
              step={0.1}
              value={value}
              onChange={(e) => {
                handleChange(param as keyof ParameterValues, parseFloat(e.target.value));
              }}
              className="slider w-full"
            />
          </div>
        );
      })}
    </div>
  );
}