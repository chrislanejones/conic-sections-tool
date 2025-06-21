import * as THREE from "three";

export interface ConicType {
  type: "parabola" | "circle" | "ellipse" | "hyperbola";
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
  type: string;
  equation: string;
  parameters:
    | ParabolaParameters
    | EllipseParameters
    | CircleParameters
    | HyperbolaParameters;
  timestamp: string;
}

export interface ThreeJSScene {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  animationId?: number;
}

export interface ConicConfig {
  type: ConicType["type"];
  color: string;
  description: string;
  planeAngle: {
    position: [number, number, number];
    rotation: [number, number, number];
  };
}
