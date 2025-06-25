"use client";

import React, { useState, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { EllipseParameters } from "@/types";
import { generateConicPlotData } from "@/utils/mathUtils";
import { ParameterControls } from "@/components/ParameterControls";
import { ConicSelector } from "@/components/ConicSelector";
import Header from "@/components/Header";
import type { ConicType } from "@/types";
import { setupThreeScene } from "@/utils/threeUtils";

const PlotlyChart = dynamic(() => import("@/components/PlotlyChart"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const [conicType, setConicType] = useState<ConicType>("parabola");
  const [params, setParams] = useState<EllipseParameters>({
    a: 1,
    b: 1,
    h: 0,
    k: 0,
  });

  // Debug logging to see state changes
  useEffect(() => {
    console.log("🔄 Conic type changed to:", conicType);
  }, [conicType]);

  useEffect(() => {
    console.log("📊 Parameters changed to:", params);
  }, [params]);

  useEffect(() => {
    if (canvasRef.current) {
      const { cleanup } = setupThreeScene(
        canvasRef.current,
        conicType,
        isDarkMode
      );
      return cleanup;
    }
  }, [conicType, isDarkMode]);

  const plotData = generateConicPlotData(conicType, params);

  const handleConicTypeChange = (newType: ConicType) => {
    console.log("🎯 ConicSelector onChange called with:", newType);
    setConicType(newType);
  };

  const handleParamsChange = (newParams: EllipseParameters) => {
    console.log("⚙️ ParameterControls onChange called with:", newParams);
    setParams(newParams);
  };

  const handleReset = () => {
    console.log("🔄 Reset button clicked");
    setParams({ a: 1, b: 1, h: 0, k: 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 p-6 overflow-y-auto border-r border-border bg-card">
          <Header
            plotData={plotData}
            equationJSON={JSON.stringify({ conicType, ...params }, null, 2)}
          />

          <p className="text-sm text-muted-foreground mb-6">
            Explore parabolas, circles, ellipses, and hyperbolas
          </p>

          <div className="mb-6">
            <ConicSelector
              conicType={conicType}
              onChange={handleConicTypeChange}
            />
          </div>

          <div className="p-4 rounded-lg mb-6 border border-primary/20 bg-primary/5">
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Current Equation:
            </h3>
            <div className="text-lg font-mono text-primary/80">
              {conicType === "parabola" &&
                `y = ${params.a}(x - ${params.h})² + ${params.k}`}
              {conicType === "circle" &&
                `(x - ${params.h})² + (y - ${params.k})² = ${params.a}²`}
              {conicType === "ellipse" &&
                `(x - ${params.h})²/${params.a}² + (y - ${params.k})²/${params.b}² = 1`}
              {conicType === "hyperbola" &&
                `(x - ${params.h})²/${params.a}² - (y - ${params.k})²/${params.b}² = 1`}
            </div>
          </div>

          <ParameterControls
            conicType={conicType}
            params={params}
            onChange={handleParamsChange}
          />

          <button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors mb-6"
            onClick={handleReset}
          >
            Reset to Default
          </button>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-card-foreground">
                How Conic Sections Form:
              </h4>
              <button
                className="p-1.5 rounded-md transition-colors bg-muted hover:bg-muted/80 text-muted-foreground"
                title="Pause animation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="4" height="16" x="6" y="4"></rect>
                  <rect width="4" height="16" x="14" y="4"></rect>
                </svg>
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <div
                className="border rounded-lg border-border"
                style={{ width: 300, height: 300 }}
              >
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-primary rounded mr-3 mt-0.5 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-primary mb-1">
                    {conicType.charAt(0).toUpperCase() + conicType.slice(1)}
                  </div>
                  <div>
                    A {conicType} forms based on how a plane intersects a cone.
                    This view helps visualize the geometry behind its equation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Chart Area */}
        <main className="flex-1 p-6 bg-background">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Loading chart...</p>
                </div>
              </div>
            }
          >
            <PlotlyChart type={conicType} params={params} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
