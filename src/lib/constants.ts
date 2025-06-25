export const APP_CONFIG = {
 name: "Interactive Conic Sections",
 description:
  "Explore and visualize conic sections with interactive 3D demonstrations",
 version: "1.0.0",
 author: "Educational Mathematics Tools",
 repository: "https://github.com/yourusername/interactive-conic-sections",
 demo: "https://conic-sections.vercel.app",
} as const;

export const MATHEMATICAL_CONSTANTS = {
 PI: Math.PI,
 E: Math.E,
 PHI: (1 + Math.sqrt(5)) / 2, // Golden ratio
} as const;

export const VISUALIZATION_SETTINGS = {
 defaultRange: 15,
 gridStep: 5,
 animationSpeed: 0.01,
 coneSegments: 32,
 renderQuality: {
  width: 250,
  height: 250,
  antialias: true,
 },
} as const;

export const EXPORT_SETTINGS = {
 imageWidth: 800,
 imageHeight: 600,
 imageQuality: 0.95,
 jsonIndentation: 2,
} as const;
