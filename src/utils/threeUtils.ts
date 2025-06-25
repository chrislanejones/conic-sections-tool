// Utility functions for setting up Three.js scenes with conic intersections
import * as THREE from "three";

export function createCones(material: THREE.Material) {
  const coneGeometry1 = new THREE.ConeGeometry(1, 3, 32);
  const coneGeometry2 = new THREE.ConeGeometry(1, 3, 32);

  const cone1 = new THREE.Mesh(coneGeometry1, material);
  const cone2 = new THREE.Mesh(coneGeometry2, material);

  cone1.position.y = 1.5;
  cone1.rotation.x = Math.PI;

  cone2.position.y = -1.5;
  cone2.rotation.x = Math.PI * 2;

  return { cone1, cone2 };
}

export function createCuttingPlane(
  type: "circle" | "ellipse" | "parabola" | "hyperbola"
) {
  const planeGeometry = new THREE.PlaneGeometry(3, 3);
  let color = 0x000000;
  let position: [number, number, number] = [0, 1, 0];
  let rotation: [number, number, number] = [0, 0, 0];

  switch (type) {
    case "circle":
      color = 0xef4444;
      position = [0, 1.0, 0];
      rotation = [Math.PI / 2, 0, 0];
      break;
    case "ellipse":
      color = 0x22c55e;
      position = [0, 0.8, 0];
      rotation = [Math.PI / 3, 0, 0];
      break;
    case "parabola":
      color = 0x3b82f6;
      position = [0, 0.9, 0];
      rotation = [Math.PI / 4.5, 0, 0];
      break;
    case "hyperbola":
      color = 0xf97316;
      position = [0, 1.0, 0];
      rotation = [Math.PI / 6, 0, 0];
      break;
  }

  const planeMaterial = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(...position);
  plane.rotation.set(...rotation);

  return plane;
}

export function setupThreeScene(
  canvas: HTMLCanvasElement,
  type: "circle" | "ellipse" | "parabola" | "hyperbola"
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.width, canvas.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const material = new THREE.MeshNormalMaterial({ wireframe: false });

  const { cone1, cone2 } = createCones(material);
  const plane = createCuttingPlane(type);

  scene.add(cone1);
  scene.add(cone2);
  scene.add(plane);

  const animate = () => {
    cone1.rotation.y += 0.01;
    cone2.rotation.y += 0.01;
    plane.rotation.z += 0.005;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  return { scene, renderer, camera };
}
