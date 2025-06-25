import * as THREE from "three";

export type ConicType = "parabola" | "circle" | "ellipse" | "hyperbola";

interface PlotlyChartProps {
 type: ConicType;
 params: ConicParams;
}

export interface ParabolaParameters {
 a: number;
 h: number;
 k: number;
}

export interface EllipseParameters {
 a: number;
 b: number;
 h: number;
 k: number;
}

export interface CircleParameters {
 r: number;
 h: number;
 k: number;
}

export interface HyperbolaParameters {
 a: number;
 b: number;
 h: number;
 k: number;
}

export type ConicParams =
 | ParabolaParameters
 | EllipseParameters
 | CircleParameters
 | HyperbolaParameters;

export interface MathematicalElement {
 type: "point" | "line";
 x?: number;
 y?: number;
 label: string;
 color: string;
}

export interface DataPoint {
 x: number;
 y: number;
}

export interface ExportData {
 type: ConicType;
 equation: string;
 parameters: ConicParams;
 timestamp: string;
}

export interface ThreeJSScene {
 scene: THREE.Scene;
 renderer: THREE.WebGLRenderer;
 camera: THREE.PerspectiveCamera;
 animationId?: number;
}

export interface ConicConfig {
 type: ConicType;
 color: string;
 description: string;
 planeAngle: {
  position: [number, number, number];
  rotation: [number, number, number];
 };
}
