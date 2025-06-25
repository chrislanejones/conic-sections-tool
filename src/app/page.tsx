"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { EllipseParameters } from "@/types";
import { generateConicPlotData } from "@/utils/mathUtils";
import { ParameterControls } from "@/components/ParameterControls";
import { ConicSelector } from "@/components/ConicSelector";
import Header from "@/components/Header";
import type { ConicType } from "@/types";

const PlotlyChart = dynamic(() => import("@/components/PlotlyChart"), {
  ssr: false,
  loading: () => <div className="text-center p-6">Loading chart...</div>,
});

export default function HomePage() {
  const [conicType, setConicType] = useState<ConicType>("parabola");
  const [params, setParams] = useState<EllipseParameters>({
    a: 1,
    b: 1,
    h: 0,
    k: 0,
  });

  const plotData = generateConicPlotData(conicType, params);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 p-6 overflow-y-auto border-r border-gray-300 dark:border-gray-700">
        <Header
          plotData={plotData}
          equationJSON={JSON.stringify({ conicType, ...params }, null, 2)}
        />

        <p className="text-sm text-gray-400 mb-6">
          Explore parabolas, circles, ellipses, and hyperbolas
        </p>

        <div className="mb-6">
          <ConicSelector conicType={conicType} onChange={setConicType} />
        </div>

        <div className="p-4 rounded-lg mb-6 border bg-blue-900/20 border-blue-800">
          <h3 className="text-lg font-semibold mb-2 text-blue-300">
            Current Equation:
          </h3>
          <div className="text-lg font-mono text-blue-200">
            y = {params.a}(x - {params.h})² + {params.k}
          </div>
        </div>

        <ParameterControls
          conicType={conicType}
          params={params}
          onChange={setParams}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          onClick={() => setParams({ a: 1, b: 1, h: 0, k: 0 })}
        >
          Reset to Default
        </button>

        <div className="p-4 rounded-lg border mt-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">How Conic Sections Form:</h4>
            <button
              className="p-1.5 rounded-md transition-colors bg-gray-700 hover:bg-gray-600 text-gray-300"
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
                className="lucide lucide-pause"
              >
                <rect width="4" height="16" x="6" y="4"></rect>
                <rect width="4" height="16" x="14" y="4"></rect>
              </svg>
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <div
              className="border rounded-lg border-gray-600"
              style={{ width: 300, height: 300 }}
            >
              <canvas id="three-canvas" width="300" height="300" />
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-500 rounded mr-3 mt-0.5 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-blue-500 mb-1">
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

      {/* Plot Area */}
      <main className="flex-1 p-6">
        <Suspense
          fallback={<div className="p-6 text-center">Loading chart...</div>}
        >
          <PlotlyChart conicType={conicType} params={params} />
        </Suspense>
      </main>
    </div>
  );
}
