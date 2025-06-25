"use client";

import React from "react";

export type ConicType = "circle" | "ellipse" | "parabola" | "hyperbola";

export interface ConicSelectorProps {
  conicType: ConicType;
  onChange: (value: ConicType) => void;
}

export function ConicSelector({ conicType, onChange }: ConicSelectorProps) {
  return (
    <div className="space-y-2">
      {["circle", "ellipse", "parabola", "hyperbola"].map((type) => (
        <label key={type} className="block">
          <input
            type="radio"
            name="conic"
            value={type}
            checked={conicType === type}
            onChange={() => onChange(type as ConicType)}
            className="mr-2"
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </div>
  );
}
