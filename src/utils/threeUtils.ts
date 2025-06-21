import * as THREE from "three";
import type { ConicConfig } from "@/types";

export const CONIC_CONFIGS: Record<string, ConicConfig> = {
  circle: {
    type: "circle",
    color: "#ef4444",
    description: "Plane cuts cone horizontally",
    planeAngle: {
      position: [0, 0.5, 0],
      rotation: [Math.PI / 2, 0, 0],
    },
  },
  ellipse: {
    type: "ellipse",
    color: "#22c55e",
    description: "Plane cuts cone at an angle",
    planeAngle: {
      position: [0, 0.2, 0],
      rotation: [Math.PI / 3, 0, 0],
    },
  },
  parabola: {
    type: "parabola",
    color: "#3b82f6",
    description: "Plane parallel to cone's side",
    planeAngle: {
      position: [0, -0.2, 0],
      rotation: [Math.PI / 2.2, 0, 0],
    },
  },
  hyperbola: {
    type: "hyperbola",
    color: "#f97316",
    description: "Plane cuts through both cones",
    planeAngle: {
      position: [0, 0, 0],
      rotation: [Math.PI / 6, 0, 0],
    },
  },
};

export const createConeGeometry = (): {
  cone1: THREE.Mesh;
  cone2: THREE.Mesh;
} => {
  const coneGeometry1 = new THREE.ConeGeometry(1.5, 3, 32);
  const coneGeometry2 = new THREE.ConeGeometry(1.5, 3, 32);

  const cone1 = new THREE.Mesh(coneGeometry1, new THREE.MeshBasicMaterial());
  const cone2 = new THREE.Mesh(coneGeometry2, new THREE.MeshBasicMaterial());

  cone1.position.y = 1.5;
  cone2.position.y = -1.5;
  cone2.rotation.x = Math.PI;

  return { cone1, cone2 };
};

export const createCuttingPlane = (
  conicType: string,
  color: number = 0x3b82f6
): THREE.Mesh => {
  const planeGeometry = new THREE.PlaneGeometry(3, 3);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  const config = CONIC_CONFIGS[conicType];

  if (config) {
    plane.position.set(...config.planeAngle.position);
    plane.rotation.set(...config.planeAngle.rotation);
  }

  return plane;
};

export const updateSceneTheme = (
  scene: THREE.Scene,
  material: THREE.MeshBasicMaterial,
  darkMode: boolean
): void => {
  scene.background = new THREE.Color(darkMode ? 0x1f2937 : 0xf9fafb);
  material.color.setHex(darkMode ? 0x4b5563 : 0x9ca3af);
};
