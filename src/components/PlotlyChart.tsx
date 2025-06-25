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
      const { r, h, k } = params as any;
      points = generateEllipsePoints(r, r, h, k);
      break;
    }
    default:
      break;
  }

  const xPoints = points.map((p) => p.x);
  const yPoints = points.map((p) => p.y);

  const layout = {
    title: { text: formatEquation(type, params as any) },
    xaxis: { range: [-20, 20], title: { text: "x" } },
    yaxis: { range: [-20, 20], title: { text: "y" } },
    margin: { t: 30 },
  };

  const trace = {
    x: xPoints,
    y: yPoints,
    mode: "lines" as const,
    type: "scatter" as const,
    name: "Conic Section",
    line: { shape: "spline" as const },
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true }}
    />
  );
};

export default PlotlyChart;
