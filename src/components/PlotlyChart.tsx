import React from "react";
import Plot from "react-plotly.js";
import type { Layout, Data } from "plotly.js";
import { ConicType, ParabolaParameters | EllipseParameters | CircleParameters | HyperbolaParameters } from '@/types';

export interface PlotlyChartProps {
  conicType: ConicType;
  params: ParabolaParameters | EllipseParameters | CircleParameters | HyperbolaParameters;
}
const PlotlyChart: React.FC<PlotlyChartProps> = ({ conicType, params }) => {
  // generate layout and data based on conicType and params
  const data: Data[] = [
    {
      x: [
        /* your x values */
      ],
      y: [
        /* your y values */
      ],
      type: "scatter",
      mode: "lines",
      marker: { color: "blue" },
    },
  ];

  const layout: Partial<Layout> = {
    title: `${conicType} graph`,
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
  };

  return <Plot data={data} layout={layout} />;
};

export default PlotlyChart;
