import { useTheme } from "next-themes";
import type { ConicType } from "@/types";

interface ConicSelectorProps {
  conicType: ConicType;
  onChange: (type: ConicType) => void;
}

export function ConicSelector({ conicType, onChange }: ConicSelectorProps) {
  const types: ConicType[] = ["parabola", "circle", "ellipse", "hyperbola"];

  const handleClick = (type: ConicType) => {
    console.log("🎯 Button clicked for:", type);
    onChange(type);
  };

  return (
    <div className="mb-6">
      <div className="flex rounded-lg p-1 w-full bg-muted">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              conicType === type
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="text-center mt-2 text-sm font-medium text-primary">
        {conicType.charAt(0).toUpperCase() + conicType.slice(1)} Conic Type
      </div>
    </div>
  );
}
