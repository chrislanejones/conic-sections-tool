"use client"

import type { ConicType } from "@/types";

interface ConicSelectorProps {
  conicType: ConicType;
  onChange: (type: ConicType) => void;
}

export function ConicSelector({ conicType, onChange }: ConicSelectorProps) {
  const types: ConicType[] = ["parabola", "circle", "ellipse", "hyperbola"];

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground block">
        Conic Type
      </label>
      <div className="grid grid-cols-2 gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              conicType === type
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-foreground hover:bg-accent"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}