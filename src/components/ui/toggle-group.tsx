import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const ToggleGroup = React.forwardRef<
 React.ElementRef<typeof ToggleGroupPrimitive.Root>,
 React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
 <ToggleGroupPrimitive.Root
 ref={ref}
 className={cn("inline-flex items-center justify-center", className)}
 {...props}
 />
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
 React.ElementRef<typeof ToggleGroupPrimitive.Item>,
 React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
 <ToggleGroupPrimitive.Item
 ref={ref}
 className={cn(
 "data-[state=on]:bg-gray-900 data-[state=on]:text-primary data-[state=on]:shadow-sm text-primary px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
 className
 )}
 {...props}
 />
));
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
