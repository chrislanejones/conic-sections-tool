"use client";

import React, { useState, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { EllipseParameters } from "@/types";
import { ParameterControls } from "@/components/ParameterControls";
import { ConicSelector } from "@/components/ConicSelector";
import Header from "@/components/Header";
import type { ConicType } from "@/types";
import { setupThreeScene } from "@/utils/threeUtils";

const PlotlyChart = dynamic(() => import("@/components/PlotlyChart"), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

function LoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center space-y-4">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneControlsRef = useRef<{
    pauseAnimation: () => void;
    playAnimation: () => void;
    isPlaying: () => boolean;
    cleanup: () => void;
  } | null>(null);

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  const [conicType, setConicType] = useState<ConicType>("parabola");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [params, setParams] = useState<EllipseParameters>({
    a: 2,
    b: 1.5,
    h: 0,
    k: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (canvasRef.current && canvasContainerRef.current && mounted) {
      const width = canvasContainerRef.current.clientWidth;
      const height = canvasContainerRef.current.clientHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const controls = setupThreeScene(canvasRef.current, conicType, isDarkMode);
      sceneControlsRef.current = controls;
      return controls.cleanup;
    }
  }, [conicType, isDarkMode, mounted]);

  const handleConicTypeChange = (newType: ConicType) => {
    setConicType(newType);
  };

  const handleParamsChange = (newParams: EllipseParameters) => {
    setParams(newParams);
  };

  const handleReset = () => {
    setParams({ a: 2, b: 1.5, h: 0, k: 0 });
  };

  const toggleAnimation = () => {
    if (sceneControlsRef.current) {
      if (isAnimationPlaying) {
        sceneControlsRef.current.pauseAnimation();
        setIsAnimationPlaying(false);
      } else {
        sceneControlsRef.current.playAnimation();
        setIsAnimationPlaying(true);
      }
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <LoadingPlaceholder />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <ConicSelector conicType={conicType} onChange={handleConicTypeChange} />

              <div className="border-t border-border pt-4">
                <ParameterControls
                  conicType={conicType}
                  params={params}
                  onChange={handleParamsChange}
                />
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-accent hover:text-card-foreground transition-colors text-sm font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={toggleAnimation}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  {isAnimationPlaying ? "Pause" : "Play"}
                </button>
              </div>
            </div>

            {/* 3D Preview - Fill remaining space */}
            {mounted && (
              <div
                ref={canvasContainerRef}
                className="flex-1 bg-card border border-border rounded-lg overflow-hidden"
              >
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            )}
          </div>

          {/* Main Content - Chart */}
          <div className="lg:col-span-2">
            <Suspense fallback={<LoadingPlaceholder />}>
              <PlotlyChart type={conicType} params={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}