// Utility functions for setting up Three.js scenes with conic intersections
import * as THREE from "three";

export function createDoubleCone(darkMode: boolean = true) {
  // Create wireframe material with theme-appropriate colors
  const coneMaterial = new THREE.MeshBasicMaterial({
    color: darkMode ? 0x6b7280 : 0x4b5563, // Lighter in dark mode, darker in light mode
    wireframe: true,
    transparent: true,
    opacity: darkMode ? 0.7 : 0.8,
  });

  // Create two cone geometries
  const coneGeometry1 = new THREE.ConeGeometry(1.5, 3, 32);
  const coneGeometry2 = new THREE.ConeGeometry(1.5, 3, 32);

  const cone1 = new THREE.Mesh(coneGeometry1, coneMaterial);
  const cone2 = new THREE.Mesh(coneGeometry2, coneMaterial);

  // Position cones so their points touch in the middle
  // Top cone: point down, base up
  cone1.position.y = 1.5; // Move up so point is at y=0
  cone1.rotation.x = 0; // Default orientation (point down)

  // Bottom cone: point up, base down
  cone2.position.y = -1.5; // Move down so point is at y=0
  cone2.rotation.x = Math.PI; // Flip 180° so point faces up

  return { cone1, cone2 };
}

export function createCuttingPlane(
  type: "circle" | "ellipse" | "parabola" | "hyperbola"
) {
  const planeGeometry = new THREE.PlaneGeometry(3, 3);
  let color: number;
  let position: [number, number, number];
  let rotation: [number, number, number];

  switch (type) {
    case "circle":
      color = 0xef4444; // red
      position = [0, 0.8, 0]; // Cut through upper cone horizontally
      rotation = [Math.PI / 2, 0, 0]; // Horizontal cut
      break;
    case "ellipse":
      color = 0x22c55e; // green
      position = [0, 0.5, 0]; // Cut through upper cone at angle
      rotation = [Math.PI / 3, 0, 0]; // Angled cut
      break;
    case "parabola":
      color = 0x3b82f6; // blue
      position = [0, 0.2, 0]; // Cut near the point, parallel to cone side
      rotation = [Math.PI / 2.3, 0, 0]; // Parallel to cone's side
      break;
    case "hyperbola":
      color = 0xf97316; // orange
      position = [0, 0, 0]; // Cut through the touching points
      rotation = [Math.PI / 8, 0, 0]; // Steep angle through both cones
      break;
  }

  const planeMaterial = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(...position);
  plane.rotation.set(...rotation);

  return plane;
}

export function setupThreeScene(
  canvas: HTMLCanvasElement,
  type: "circle" | "ellipse" | "parabola" | "hyperbola",
  darkMode: boolean = true
) {
  // Scene setup
  const scene = new THREE.Scene();
  // Theme-appropriate background colors
  scene.background = new THREE.Color(darkMode ? 0x111827 : 0xf8fafc);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  camera.position.set(3, 2, 4);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.width, canvas.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Create and add cones
  const { cone1, cone2 } = createDoubleCone(darkMode);
  scene.add(cone1);
  scene.add(cone2);

  // Create and add cutting plane
  const plane = createCuttingPlane(type);
  scene.add(plane);

  // Animation variables
  let animationId: number;
  let isAnimating = true;

  // Animation loop
  const animate = () => {
    if (!isAnimating) return;

    // Rotate the cones slowly
    cone1.rotation.y += 0.005;
    cone2.rotation.y += 0.005;

    // Slight rotation of the cutting plane for visual effect
    plane.rotation.z += 0.002;

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  };

  // Start animation
  animate();

  // Return cleanup function and controls
  return {
    scene,
    renderer,
    camera,
    // Animation control functions
    pauseAnimation: () => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    },
    playAnimation: () => {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    },
    isPlaying: () => isAnimating,
    cleanup: () => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      renderer.dispose();

      // Dispose geometries and materials
      cone1.geometry.dispose();
      cone2.geometry.dispose();
      plane.geometry.dispose();
      (cone1.material as THREE.Material).dispose();
      (cone2.material as THREE.Material).dispose();
      (plane.material as THREE.Material).dispose();
    },
    updateConicType: (
      newType: "circle" | "ellipse" | "parabola" | "hyperbola"
    ) => {
      // Remove old plane
      scene.remove(plane);
      plane.geometry.dispose();
      (plane.material as THREE.Material).dispose();

      // Add new plane
      const newPlane = createCuttingPlane(newType);
      scene.add(newPlane);

      // Update reference (this is a limitation - ideally we'd return the new plane)
      // For now, the component should recreate the scene when type changes
    },
  };
}

// Helper function to update scene background based on theme
export function updateSceneTheme(scene: THREE.Scene, darkMode: boolean) {
  scene.background = new THREE.Color(darkMode ? 0x111827 : 0xf8fafc);
}

// Color mappings for each conic type
export const CONIC_COLORS = {
  circle: 0xef4444, // red
  ellipse: 0x22c55e, // green
  parabola: 0x3b82f6, // blue
  hyperbola: 0xf97316, // orange
} as const;
