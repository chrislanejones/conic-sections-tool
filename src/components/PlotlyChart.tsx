import React from "react";
import Plot from "react-plotly.js";
import { useTheme } from "next-themes";
import {
  generateParabolaPoints,
  generateEllipsePoints,
  generateHyperbolaPoints,
  formatEquation,
} from "@/utils/mathUtils";
import { ConicType, PlotlyChartProps, DataPoint } from "@/types";

// Calculate key points for each conic type
const calculateKeyPoints = (type: ConicType, params: any) => {
  const { a, b, h, k } = params;

  switch (type) {
    case "parabola": {
      const vertex = { x: h, y: k };
      const focus = { x: h, y: k + 1 / (4 * a) };
      const directrix = k - 1 / (4 * a);
      return { vertex, focus, directrix, type: "parabola" as const };
    }

    case "circle": {
      const center = { x: h, y: k };
      const radius = a;
      return { center, radius, type: "circle" as const };
    }

    case "ellipse": {
      const center = { x: h, y: k };
      const c = Math.sqrt(Math.abs(a * a - b * b));
      const foci =
        a > b
          ? [
              { x: h - c, y: k },
              { x: h + c, y: k },
            ]
          : [
              { x: h, y: k - c },
              { x: h, y: k + c },
            ];
      const vertices =
        a > b
          ? [
              { x: h - a, y: k },
              { x: h + a, y: k },
            ]
          : [
              { x: h, y: k - b },
              { x: h, y: k + b },
            ];
      return { center, foci, vertices, type: "ellipse" as const };
    }

    case "hyperbola": {
      const center = { x: h, y: k };
      const c = Math.sqrt(a * a + b * b);
      const foci = [
        { x: h - c, y: k },
        { x: h + c, y: k },
      ];
      const vertices = [
        { x: h - a, y: k },
        { x: h + a, y: k },
      ];
      return { center, foci, vertices, type: "hyperbola" as const };
    }

    default:
      return null;
  }
};

const PlotlyChart: React.FC<PlotlyChartProps> = ({ type, params }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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

  // Get CSS custom properties from the document root
  const rootStyles =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;

  // Helper function to get HSL values and convert to hex
  const getThemeColor = (property: string) => {
    if (!rootStyles) return isDark ? "#ffffff" : "#000000";
    const hslValue = rootStyles.getPropertyValue(property).trim();
    if (!hslValue) return isDark ? "#ffffff" : "#000000";

    // Convert HSL to hex for Plotly
    const [h, s, l] = hslValue
      .split(" ")
      .map((v) => parseFloat(v.replace("%", "")));
    return hslToHex(h || 0, (s || 0) / 100, (l || 0) / 100);
  };

  // HSL to Hex conversion function
  const hslToHex = (h: number, s: number, l: number) => {
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Theme-aware colors using shadcn/ui CSS custom properties
  const colors = {
    title: getThemeColor("--foreground"),
    axis: getThemeColor("--muted-foreground"),
    grid: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)", // --muted equivalent
    zeroLine: getThemeColor("--border"),
    tick: getThemeColor("--border"),
    tickText: getThemeColor("--muted-foreground"),
    paperBg: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(0 0% 100%)", // --background
    plotBg: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(210 40% 96%)", // --card vs --muted
  };

  // Calculate key points for current conic
  const keyPoints = calculateKeyPoints(type, params);

  // Create data array with main curve
  const plotData: any[] = [
    {
      x: xPoints,
      y: yPoints,
      mode: "lines",
      type: "scatter",
      name: "Conic Section",
      line: {
        shape: "spline",
        color: "hsl(221.2 83.2% 53.3%)", // --primary
        width: 3,
      },
    },
  ];

  // Add key points based on conic type
  if (keyPoints) {
    switch (keyPoints.type) {
      case "parabola":
        // Add vertex
        if (keyPoints.vertex) {
          plotData.push({
            x: [keyPoints.vertex.x],
            y: [keyPoints.vertex.y],
            mode: "markers",
            type: "scatter",
            name: "Vertex",
            marker: { color: "#10b981", size: 8 },
            showlegend: false,
          });
        }

        // Add focus
        if (keyPoints.focus) {
          plotData.push({
            x: [keyPoints.focus.x],
            y: [keyPoints.focus.y],
            mode: "markers",
            type: "scatter",
            name: "Focus",
            marker: { color: "#ef4444", size: 8 },
            showlegend: false,
          });
        }

        // Add directrix line
        if (typeof keyPoints.directrix === "number") {
          plotData.push({
            x: [-15, 15],
            y: [keyPoints.directrix, keyPoints.directrix],
            mode: "lines",
            type: "scatter",
            name: "Directrix",
            line: { color: "#f59e0b", width: 2, dash: "dash" },
            showlegend: false,
          });
        }
        break;

      case "circle":
        // Add center
        if (keyPoints.center) {
          plotData.push({
            x: [keyPoints.center.x],
            y: [keyPoints.center.y],
            mode: "markers",
            type: "scatter",
            name: "Center",
            marker: { color: "#3b82f6", size: 8 },
            showlegend: false,
          });
        }
        break;

      case "ellipse":
        // Add center
        if (keyPoints.center) {
          plotData.push({
            x: [keyPoints.center.x],
            y: [keyPoints.center.y],
            mode: "markers",
            type: "scatter",
            name: "Center",
            marker: { color: "#3b82f6", size: 8 },
            showlegend: false,
          });
        }

        // Add foci
        if (keyPoints.foci && keyPoints.foci.length > 0) {
          plotData.push({
            x: keyPoints.foci.map((f) => f.x),
            y: keyPoints.foci.map((f) => f.y),
            mode: "markers",
            type: "scatter",
            name: "Foci",
            marker: { color: "#ef4444", size: 8 },
            showlegend: false,
          });
        }

        // Add vertices
        if (keyPoints.vertices && keyPoints.vertices.length > 0) {
          plotData.push({
            x: keyPoints.vertices.map((v) => v.x),
            y: keyPoints.vertices.map((v) => v.y),
            mode: "markers",
            type: "scatter",
            name: "Vertices",
            marker: { color: "#10b981", size: 8 },
            showlegend: false,
          });
        }
        break;

      case "hyperbola":
        // Add center
        if (keyPoints.center) {
          plotData.push({
            x: [keyPoints.center.x],
            y: [keyPoints.center.y],
            mode: "markers",
            type: "scatter",
            name: "Center",
            marker: { color: "#3b82f6", size: 8 },
            showlegend: false,
          });
        }

        // Add foci
        if (keyPoints.foci && keyPoints.foci.length > 0) {
          plotData.push({
            x: keyPoints.foci.map((f) => f.x),
            y: keyPoints.foci.map((f) => f.y),
            mode: "markers",
            type: "scatter",
            name: "Foci",
            marker: { color: "#ef4444", size: 8 },
            showlegend: false,
          });
        }

        // Add vertices
        if (keyPoints.vertices && keyPoints.vertices.length > 0) {
          plotData.push({
            x: keyPoints.vertices.map((v) => v.x),
            y: keyPoints.vertices.map((v) => v.y),
            mode: "markers",
            type: "scatter",
            name: "Vertices",
            marker: { color: "#10b981", size: 8 },
            showlegend: false,
          });
        }
        break;
    }
  }

  const layout = {
    title: {
      text: formatEquation(type, params as any),
      font: {
        color: colors.title,
        size: 18,
      },
    },
    xaxis: {
      range: [-15, 15],
      title: { text: "x", font: { color: colors.axis } },
      gridcolor: colors.grid,
      zerolinecolor: colors.zeroLine,
      tickcolor: colors.tick,
      tickfont: { color: colors.tickText },
    },
    yaxis: {
      range: [-15, 15],
      title: { text: "y", font: { color: colors.axis } },
      gridcolor: colors.grid,
      zerolinecolor: colors.zeroLine,
      tickcolor: colors.tick,
      tickfont: { color: colors.tickText },
    },
    paper_bgcolor: colors.paperBg,
    plot_bgcolor: colors.plotBg,
    margin: { t: 60, r: 40, b: 60, l: 60 },
    showlegend: false,
  };

  return (
    <div className="h-full w-full bg-card rounded-lg border border-border p-6">
      <h3 className="text-xl font-semibold mb-4 text-card-foreground">
        Interactive Graph
      </h3>
      <div className="h-[calc(100%-3rem)]">
        <Plot
          divId="plotly-chart"
          data={plotData}
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
