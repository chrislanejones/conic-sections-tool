// src/app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sun, Moon, Share2, Download, Play, Pause } from "lucide-react";
import * as THREE from "three";

// Import types and utilities
import type { MathematicalElement, DataPoint, ExportData } from "@/types";
import {
  calculateParabolaFocus,
  calculateParabolaDirectrix,
  calculateEllipseFoci,
  calculateHyperbolaFoci,
  generateParabolaPoints,
  generateEllipsePoints,
  generateHyperbolaPoints,
} from "@/utils/mathUtils";
import {
  exportToJSON,
  shareToClipboard,
  generateShareText,
} from "@/utils/exportUtils";

export default function ConicSectionsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [conicType, setConicType] = useState("parabola");
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  // Parabola parameters
  const [a, setA] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);

  // Ellipse/Hyperbola parameters
  const [aEllipse, setAEllipse] = useState(3);
  const [bEllipse, setBEllipse] = useState(2);
  const [hEllipse, setHEllipse] = useState(0);
  const [kEllipse, setKEllipse] = useState(0);

  const [data, setData] = useState<DataPoint[]>([]);
  const [mathematicalElements, setMathematicalElements] = useState<
    MathematicalElement[]
  >([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);

  // Three.js cone visualization
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(darkMode ? 0x1f2937 : 0xf9fafb);

    const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(250, 250);

    // Clear previous renderer
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Create double cone
    const coneGeometry1 = new THREE.ConeGeometry(1.5, 3, 32);
    const coneGeometry2 = new THREE.ConeGeometry(1.5, 3, 32);

    const coneMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x4b5563 : 0x9ca3af,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const cone1 = new THREE.Mesh(coneGeometry1, coneMaterial);
    const cone2 = new THREE.Mesh(coneGeometry2, coneMaterial);

    cone1.position.y = 1.5;
    cone2.position.y = -1.5;
    cone2.rotation.x = Math.PI;

    scene.add(cone1);
    scene.add(cone2);

    // Create cutting plane based on conic type
    const planeGeometry = new THREE.PlaneGeometry(3, 3);
    let planeColor: number,
      planePosition: [number, number, number],
      planeRotation: [number, number, number];

    switch (conicType) {
      case "circle":
        planeColor = 0xef4444; // red
        planePosition = [0, 0.5, 0];
        planeRotation = [Math.PI / 2, 0, 0];
        break;
      case "ellipse":
        planeColor = 0x22c55e; // green
        planePosition = [0, 0.2, 0];
        planeRotation = [Math.PI / 3, 0, 0];
        break;
      case "parabola":
        planeColor = 0x3b82f6; // blue
        planePosition = [0, -0.2, 0];
        planeRotation = [Math.PI / 2.2, 0, 0];
        break;
      case "hyperbola":
        planeColor = 0xf97316; // orange
        planePosition = [0, 0, 0];
        planeRotation = [Math.PI / 6, 0, 0];
        break;
      default:
        planeColor = 0x3b82f6;
        planePosition = [0, 0, 0];
        planeRotation = [0, 0, 0];
    }

    const planeMaterial = new THREE.MeshBasicMaterial({
      color: planeColor,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(...planePosition);
    plane.rotation.set(...planeRotation);
    scene.add(plane);

    // Position camera
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);

    // Animation loop with proper variable initialization
    let animationId: number | undefined;

    const animate = (): void => {
      if (isAnimationPlaying) {
        // Rotate the entire scene slowly
        scene.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);
    sceneRef.current = { scene, renderer, camera, animationId };

    // Cleanup function
    return () => {
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId);
      }
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [conicType, darkMode, isAnimationPlaying]);

  // Generate conic section data points
  useEffect(() => {
    let points: DataPoint[] = [];

    if (conicType === "parabola") {
      points = generateParabolaPoints(a, h, k);
    } else if (conicType === "ellipse") {
      points = generateEllipsePoints(aEllipse, bEllipse, hEllipse, kEllipse);
    } else if (conicType === "circle") {
      points = generateEllipsePoints(aEllipse, aEllipse, hEllipse, kEllipse); // Circle is ellipse with a=b
    } else if (conicType === "hyperbola") {
      points = generateHyperbolaPoints(aEllipse, bEllipse, hEllipse, kEllipse);
    }

    setData(points.sort((a, b) => a.x - b.x));

    // Calculate mathematical elements
    const elements: MathematicalElement[] = [];

    if (conicType === "parabola") {
      const focus = calculateParabolaFocus(a, h, k);
      const directrixY = calculateParabolaDirectrix(a, h, k); // Updated to include h parameter

      elements.push(
        { type: "point", x: h, y: k, label: "Vertex", color: "#3b82f6" },
        {
          type: "point",
          x: focus.x,
          y: focus.y,
          label: "Focus",
          color: "#ef4444",
        },
        { type: "line", y: directrixY, label: "Directrix", color: "#10b981" }
      );
    } else if (conicType === "circle") {
      elements.push({
        type: "point",
        x: hEllipse,
        y: kEllipse,
        label: "Center",
        color: "#ef4444",
      });
    } else if (conicType === "ellipse") {
      const foci = calculateEllipseFoci(aEllipse, bEllipse, hEllipse, kEllipse);
      const isHorizontal = aEllipse > bEllipse;

      elements.push(
        {
          type: "point",
          x: hEllipse,
          y: kEllipse,
          label: "Center",
          color: "#3b82f6",
        },
        {
          type: "point",
          x: foci[0].x,
          y: foci[0].y,
          label: "Focus₁",
          color: "#ef4444",
        },
        {
          type: "point",
          x: foci[1].x,
          y: foci[1].y,
          label: "Focus₂",
          color: "#ef4444",
        }
      );

      if (isHorizontal) {
        elements.push(
          {
            type: "point",
            x: hEllipse - aEllipse,
            y: kEllipse,
            label: "Vertex",
            color: "#10b981",
          },
          {
            type: "point",
            x: hEllipse + aEllipse,
            y: kEllipse,
            label: "Vertex",
            color: "#10b981",
          }
        );
      } else {
        elements.push(
          {
            type: "point",
            x: hEllipse,
            y: kEllipse - bEllipse,
            label: "Vertex",
            color: "#10b981",
          },
          {
            type: "point",
            x: hEllipse,
            y: kEllipse + bEllipse,
            label: "Vertex",
            color: "#10b981",
          }
        );
      }
    } else if (conicType === "hyperbola") {
      const foci = calculateHyperbolaFoci(
        aEllipse,
        bEllipse,
        hEllipse,
        kEllipse
      );

      elements.push(
        {
          type: "point",
          x: hEllipse,
          y: kEllipse,
          label: "Center",
          color: "#3b82f6",
        },
        {
          type: "point",
          x: foci[0].x,
          y: foci[0].y,
          label: "Focus₁",
          color: "#ef4444",
        },
        {
          type: "point",
          x: foci[1].x,
          y: foci[1].y,
          label: "Focus₂",
          color: "#ef4444",
        },
        {
          type: "point",
          x: hEllipse - aEllipse,
          y: kEllipse,
          label: "Vertex₁",
          color: "#10b981",
        },
        {
          type: "point",
          x: hEllipse + aEllipse,
          y: kEllipse,
          label: "Vertex₂",
          color: "#10b981",
        }
      );
    }

    setMathematicalElements(
      elements.filter(
        (el) => Math.abs(el.x || 0) <= 15 && Math.abs(el.y || 0) <= 15
      )
    );
  }, [conicType, a, h, k, aEllipse, bEllipse, hEllipse, kEllipse]);

  const resetToDefault = () => {
    if (conicType === "parabola") {
      setA(1);
      setH(0);
      setK(0);
    } else {
      setAEllipse(3);
      setBEllipse(2);
      setHEllipse(0);
      setKEllipse(0);
    }
  };

  const getEquation = () => {
    if (conicType === "parabola") {
      return `y = ${a !== 1 ? (a === -1 ? "-" : a) : ""}(x${h !== 0 ? (h > 0 ? ` - ${h}` : ` + ${Math.abs(h)}`) : ""})²${k !== 0 ? (k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`) : ""}`;
    } else if (conicType === "ellipse") {
      return `(x${hEllipse !== 0 ? (hEllipse > 0 ? ` - ${hEllipse}` : ` + ${Math.abs(hEllipse)}`) : ""})²/${aEllipse}² + (y${kEllipse !== 0 ? (kEllipse > 0 ? ` - ${kEllipse}` : ` + ${Math.abs(kEllipse)}`) : ""})²/${bEllipse}² = 1`;
    } else if (conicType === "circle") {
      return `(x${hEllipse !== 0 ? (hEllipse > 0 ? ` - ${hEllipse}` : ` + ${Math.abs(hEllipse)}`) : ""})² + (y${kEllipse !== 0 ? (kEllipse > 0 ? ` - ${kEllipse}` : ` + ${Math.abs(kEllipse)}`) : ""})² = ${aEllipse}²`;
    } else {
      return `(x${hEllipse !== 0 ? (hEllipse > 0 ? ` - ${hEllipse}` : ` + ${Math.abs(hEllipse)}`) : ""})²/${aEllipse}² - (y${kEllipse !== 0 ? (kEllipse > 0 ? ` - ${kEllipse}` : ` + ${Math.abs(kEllipse)}`) : ""})²/${bEllipse}² = 1`;
    }
  };

  // Export functionality
  const handleExportEquation = () => {
    const equation = getEquation();
    const parameters =
      conicType === "parabola"
        ? { a, h, k }
        : { a: aEllipse, b: bEllipse, h: hEllipse, k: kEllipse };

    const exportData: ExportData = {
      type: conicType,
      equation: equation,
      parameters: parameters,
      timestamp: new Date().toISOString(),
    };

    exportToJSON(exportData);
  };

  const handleExportImage = () => {
    // Create a canvas to render the current graph
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d")!;

    // Set background
    ctx.fillStyle = darkMode ? "#1f2937" : "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = darkMode ? "#374151" : "#e0e0e0";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    // Vertical grid lines
    for (let i = 0; i <= 30; i++) {
      const x = (i / 30) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 20; i++) {
      const y = (i / 20) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.setLineDash([]);
    ctx.strokeStyle = darkMode ? "#9CA3AF" : "#666";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Draw the curve
    if (data.length > 0) {
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = ((point.x + 15) / 30) * canvas.width;
        const y = ((15 - point.y) / 30) * canvas.height;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Draw mathematical elements
    mathematicalElements.forEach((element) => {
      if (element.type === "point") {
        const x = ((element.x! + 15) / 30) * canvas.width;
        const y = ((15 - element.y!) / 30) * canvas.height;

        ctx.fillStyle = element.color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Draw label
        ctx.fillStyle = darkMode ? "#F9FAFB" : "#111827";
        ctx.font = "12px Arial";
        ctx.fillText(element.label, x + 6, y - 6);
      }
    });

    // Add equation text
    ctx.fillStyle = darkMode ? "#F9FAFB" : "#111827";
    ctx.font = "bold 16px Arial";
    ctx.fillText(`Equation: ${getEquation()}`, 20, 30);
    ctx.fillText(
      `Type: ${conicType.charAt(0).toUpperCase() + conicType.slice(1)}`,
      20,
      55
    );

    // Export
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${conicType}-graph.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleShareToClipboard = async () => {
    const equation = getEquation();
    const parameters =
      conicType === "parabola"
        ? { a, h, k }
        : { a: aEllipse, b: bEllipse, h: hEllipse, k: kEllipse };

    const shareText = generateShareText(conicType, equation, parameters);
    const success = await shareToClipboard(shareText);

    if (success) {
      alert("Equation copied to clipboard!");
    } else {
      alert("Failed to copy to clipboard.");
    }
  };

  const themeClasses = darkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-900";

  const cardClasses = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses}`}
      onClick={(e) => {
        // Close export menu when clicking outside
        if (
          !(e.target as Element).closest(".export-menu") &&
          !(e.target as Element).closest("button[data-export-toggle]")
        ) {
          setShowExportMenu(false);
        }
      }}
    >
      <div className="flex h-screen">
        {/* Left Side - Controls */}
        <div className="w-1/3 p-6 overflow-y-auto border-r border-gray-300 dark:border-gray-700">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Conic Sections</h1>
              <div className="flex items-center space-x-2">
                {/* Export/Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                    data-export-toggle
                  >
                    <Share2 size={20} />
                  </button>

                  {showExportMenu && (
                    <div
                      className={`export-menu absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${cardClasses}`}
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleShareToClipboard();
                            setShowExportMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex items-center`}
                        >
                          <Share2 size={16} className="mr-2" />
                          Copy to Clipboard
                        </button>
                        <button
                          onClick={() => {
                            handleExportEquation();
                            setShowExportMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex items-center`}
                        >
                          <Download size={16} className="mr-2" />
                          Export Equation (JSON)
                        </button>
                        <button
                          onClick={() => {
                            handleExportImage();
                            setShowExportMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex items-center`}
                        >
                          <Download size={16} className="mr-2" />
                          Export Graph (PNG)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dark/Light Mode Button */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Explore parabolas, circles, ellipses, and hyperbolas
            </p>
          </div>

          {/* Conic Type Selection */}
          <div className="mb-6">
            <div
              className={`flex rounded-lg p-1 w-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
            >
              {["parabola", "circle", "ellipse", "hyperbola"].map((type) => (
                <button
                  key={type}
                  onClick={() => setConicType(type)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    conicType === type
                      ? darkMode
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-white text-gray-900 shadow-sm"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-600"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <div
              className={`text-center mt-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {conicType.charAt(0).toUpperCase() + conicType.slice(1)} Conic
              Type
            </div>
          </div>

          {/* Equation Display */}
          <div
            className={`p-4 rounded-lg mb-6 border ${darkMode ? "bg-blue-900/20 border-blue-800" : "bg-blue-50 border-blue-200"}`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
            >
              Current Equation:
            </h3>
            <div
              className={`text-lg font-mono ${darkMode ? "text-blue-200" : "text-blue-900"}`}
            >
              {getEquation()}
            </div>
          </div>

          {/* Parameter Controls */}
          <div className="space-y-4 mb-6">
            {conicType === "parabola" ? (
              <>
                <div className={`p-4 rounded-lg border ${cardClasses}`}>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 'a' (width/direction): {a}
                  </label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={a}
                    onChange={(e) => setA(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div
                    className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Positive: opens up, Negative: opens down
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${cardClasses}`}>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 'h' (horizontal shift): {h}
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={h}
                    onChange={(e) => setH(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div
                    className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Moves vertex left/right
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${cardClasses}`}>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 'k' (vertical shift): {k}
                  </label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.5"
                    value={k}
                    onChange={(e) => setK(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div
                    className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Moves vertex up/down
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`p-4 rounded-lg border ${cardClasses}`}>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 'a' (
                    {conicType === "ellipse"
                      ? "horizontal radius"
                      : conicType === "circle"
                        ? "radius"
                        : "horizontal scale"}
                    ): {aEllipse}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={aEllipse}
                    onChange={(e) => setAEllipse(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {conicType !== "circle" && (
                  <div className={`p-4 rounded-lg border ${cardClasses}`}>
                    <label className="block text-sm font-medium mb-2">
                      Parameter 'b' (
                      {conicType === "ellipse"
                        ? "vertical radius"
                        : "vertical scale"}
                      ): {bEllipse}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="8"
                      step="0.5"
                      value={bEllipse}
                      onChange={(e) => setBEllipse(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}

                <div className={`p-4 rounded-lg border ${cardClasses}`}>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 'h' (horizontal shift): {hEllipse}
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={hEllipse}
                    onChange={(e) => setHEllipse(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className={`p-4 rounded-lg border ${cardClasses}`}>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 'k' (vertical shift): {kEllipse}
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={kEllipse}
                    onChange={(e) => setKEllipse(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetToDefault}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Reset to Default
          </button>

          {/* Information with 3D Cone */}
          <div className={`p-4 rounded-lg border mt-6 ${cardClasses} relative`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">How Conic Sections Form:</h4>
              <button
                onClick={() => setIsAnimationPlaying(!isAnimationPlaying)}
                className={`p-1.5 rounded-md transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                title={
                  isAnimationPlaying ? "Pause animation" : "Play animation"
                }
              >
                {isAnimationPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div
                ref={mountRef}
                className={`border rounded-lg ${darkMode ? "border-gray-600" : "border-gray-300"}`}
                style={{ width: "250px", height: "250px" }}
              />
              <div
                className={`text-xs mt-2 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Interactive 3D cone showing how a {conicType} forms
              </div>
            </div>

            <div
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {conicType === "circle" && (
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-red-500 rounded mr-3 mt-0.5 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-red-500 mb-1">Circle</div>
                    <div>
                      A circle forms when a plane cuts perpendicular to the
                      cone's axis. It's the set of all points at a fixed
                      distance (radius) from a center point.
                    </div>
                  </div>
                </div>
              )}
              {conicType === "ellipse" && (
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded mr-3 mt-0.5 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-green-500 mb-1">
                      Ellipse
                    </div>
                    <div>
                      An ellipse forms when a plane cuts the cone at an angle,
                      intersecting only one cone. It's the set of all points
                      where the sum of distances to two foci is constant.
                    </div>
                  </div>
                </div>
              )}
              {conicType === "parabola" && (
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-3 mt-0.5 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-blue-500 mb-1">
                      Parabola
                    </div>
                    <div>
                      A parabola forms when a plane cuts parallel to the cone's
                      slant height. It's the set of all points equidistant from
                      a focus point and a directrix line.
                    </div>
                  </div>
                </div>
              )}
              {conicType === "hyperbola" && (
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-orange-500 rounded mr-3 mt-0.5 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-orange-500 mb-1">
                      Hyperbola
                    </div>
                    <div>
                      A hyperbola forms when a plane cuts through both cones
                      vertically. It's the set of all points where the
                      difference of distances to two foci is constant.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Graph */}
        <div className="flex-1 p-6">
          <div
            className={`h-full rounded-lg border ${cardClasses} p-6 relative`}
          >
            <h3 className="text-xl font-semibold mb-4">Graph</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#e0e0e0"}
                />
                <XAxis
                  dataKey="x"
                  type="number"
                  scale="linear"
                  domain={[-15, 15]}
                  ticks={[-15, -10, -5, 0, 5, 10, 15]}
                  stroke={darkMode ? "#9CA3AF" : "#666"}
                  interval={0}
                />
                <YAxis
                  domain={[-15, 15]}
                  ticks={[-15, -10, -5, 0, 5, 10, 15]}
                  stroke={darkMode ? "#9CA3AF" : "#666"}
                  interval={0}
                />
                <Tooltip
                  formatter={(value, name) => [value, "y"]}
                  labelFormatter={(value) => `x: ${value}`}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    color: darkMode ? "#F9FAFB" : "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Mathematical Elements Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {mathematicalElements.map((element, index) => {
                if (element.type === "point") {
                  // Convert mathematical coordinates to pixel coordinates
                  // The chart has margins: left: 20, right: 30, top: 20, bottom: 20
                  // Total chart area width and height need to be calculated properly
                  const chartArea = {
                    left: 5, // approximate percentage for left margin
                    right: 2, // approximate percentage for right margin
                    top: 2, // approximate percentage for top margin
                    bottom: 8, // approximate percentage for bottom margin
                  };

                  // Calculate position within the actual chart plotting area
                  const plotWidth = 100 - chartArea.left - chartArea.right;
                  const plotHeight = 90 - chartArea.top - chartArea.bottom;

                  const xPercent =
                    chartArea.left + ((element.x! + 15) / 30) * plotWidth;
                  const yPercent =
                    chartArea.top + ((15 - element.y!) / 30) * plotHeight;

                  return (
                    <div key={index} className="absolute">
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white"
                        style={{
                          backgroundColor: element.color,
                          left: `${xPercent}%`,
                          top: `${yPercent}%`,
                          transform: "translate(-50%, -50%)",
                          zIndex: 10,
                        }}
                      />
                      <div
                        className={`text-xs font-medium px-1 py-0.5 rounded whitespace-nowrap ${
                          darkMode
                            ? "bg-gray-800 text-gray-200"
                            : "bg-white text-gray-800"
                        } border shadow-sm`}
                        style={{
                          left: `${xPercent}%`,
                          top: `${yPercent - 4}%`,
                          transform: "translate(-50%, -100%)",
                          color: element.color,
                        }}
                      >
                        {element.label}
                      </div>
                    </div>
                  );
                } else if (element.type === "line") {
                  // Draw directrix line for parabola
                  const chartArea = {
                    left: 5,
                    right: 2,
                    top: 2,
                    bottom: 8,
                  };

                  const plotHeight = 90 - chartArea.top - chartArea.bottom;
                  const yPercent =
                    chartArea.top + ((15 - element.y!) / 30) * plotHeight;

                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: `${chartArea.left}%`,
                        right: `${chartArea.right}%`,
                      }}
                    >
                      <div
                        className="w-full border-t-2 border-dashed"
                        style={{
                          borderColor: element.color,
                          top: `${yPercent}%`,
                          zIndex: 5,
                        }}
                      />
                      <div
                        className={`absolute text-xs font-medium px-1 py-0.5 rounded whitespace-nowrap ${
                          darkMode
                            ? "bg-gray-800 text-gray-200"
                            : "bg-white text-gray-800"
                        } border shadow-sm`}
                        style={{
                          left: "5%",
                          top: `${yPercent - 1}%`,
                          transform: "translateY(-100%)",
                          color: element.color,
                        }}
                      >
                        {element.label}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
