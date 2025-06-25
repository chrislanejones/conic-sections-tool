import React from "react";
import Plot from "react-plotly.js";
import {
  generateParabolaPoints,
  generateEllipsePoints,
  generateHyperbolaPoints,
  formatEquation,
} from "@/utils/mathUtils";
import { ConicType, ConicParams, DataPoint } from "@/types";

interface PlotlyChartProps {
  type: ConicType;
  params: ConicParams;
}

const PlotlyChart: React.FC<PlotlyChartProps> = ({ type, params }) => {
  let points: DataPoint[] = [];

  switch (type) {
    case "parabola": {
      const { a, h, k } = params as any;
      points = generateParabolaPoints(a, h, k);
      break;
    }
    case "ellipse": {
      const { a, b, h, k } = params as any;
      points = generateEllipsePoints(a, b, h, k);
      break;
    }
    case "hyperbola": {
      const { a, b, h, k } = params as any;
      points = generateHyperbolaPoints(a, b, h, k);
      break;
    }
    case "circle": {
      const { a: r, h, k } = params as any;
      points = generateEllipsePoints(r, r, h, k);
      break;
    }
    default:
      break;
  }

  console.log(`📈 Generated ${points.length} points for ${type}`);

  const xPoints = points.map((p) => p.x);
  const yPoints = points.map((p) => p.y);

  const layout = {
    title: {
      text: formatEquation(type, params as any),
      font: {
        color: "#f9fafb",
        size: 18,
      },
    },
    xaxis: {
      range: [-15, 15],
      title: { text: "x", font: { color: "#d1d5db" } },
      gridcolor: "#374151",
      zerolinecolor: "#6b7280",
      tickcolor: "#6b7280",
      tickfont: { color: "#d1d5db" },
    },
    yaxis: {
      range: [-15, 15],
      title: { text: "y", font: { color: "#d1d5db" } },
      gridcolor: "#374151",
      zerolinecolor: "#6b7280",
      tickcolor: "#6b7280",
      tickfont: { color: "#d1d5db" },
    },
    paper_bgcolor: "#1f2937",
    plot_bgcolor: "#111827",
    margin: { t: 60, r: 40, b: 60, l: 60 },
    showlegend: false,
  };

  const trace = {
    x: xPoints,
    y: yPoints,
    mode: "lines" as const,
    type: "scatter" as const,
    name: "Conic Section",
    line: {
      shape: "spline" as const,
      color: "#3b82f6",
      width: 3,
    },
  };

  return (
    <div className="h-full w-full bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">
        Interactive Graph
      </h3>
      <div className="h-[calc(100%-3rem)]">
        <Plot
          divId="plotly-chart"
          data={[trace]}
          layout={layout}
          style={{ width: "100%", height: "100%" }}
          config={{
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ["pan2d", "lasso2d", "select2d"],
            displaylogo: false,
            toImageButtonOptions: {
              format: "png",
              filename: `conic-${type}-graph`,
              height: 600,
              width: 800,
              scale: 2,
            },
          }}
        />
      </div>
    </div>
  );
};

export default PlotlyChart;
