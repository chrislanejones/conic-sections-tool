import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ConicType } from "@/types";

interface ConicSelectorProps {
 conicType: ConicType;
 onChange: (type: ConicType) => void;
}

export function ConicSelector({ conicType, onChange }: ConicSelectorProps) {
 return (
 <div className="mb-6">
 <ToggleGroup
 type="single"
 value={conicType}
 onValueChange={(val) => {
 if (val) onChange(val as ConicType);
 }}
 className="w-full p-1 rounded-lg"
 >
 {(["parabola", "circle", "ellipse", "hyperbola"] as ConicType[]).map(
 (type) => (
 <ToggleGroupItem
 key={type}
 value={type}
 className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200"
 >
 {type.charAt(0).toUpperCase() + type.slice(1)}
 </ToggleGroupItem>
 )
 )}
 </ToggleGroup>
 <div className="text-center mt-2 text-sm font-medium text-primary">
 {conicType.charAt(0).toUpperCase() + conicType.slice(1)} Conic Type
 </div>
 </div>
 );
}
