"use client";

import React from "react";
import { ConicType } from "./ConicSelector";

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
    onChange({ ...params, [key]: value });
  };

  return (
    <div className="mt-4 space-y-3">
      {["a", "b", "h", "k"].map((param) => (
        <div key={param} className="flex items-center justify-between">
          <label className="capitalize w-4">{param}</label>
          <input
            type="range"
            min={param === "h" || param === "k" ? -10 : 0.1}
            max={10}
            step={0.1}
            value={params[param as keyof ParameterValues]}
            onChange={(e) =>
              handleChange(
                param as keyof ParameterValues,
                parseFloat(e.target.value)
              )
            }
            className="w-full ml-4"
          />
          <span className="ml-2 w-12 text-right text-sm">
            {params[param as keyof ParameterValues].toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
