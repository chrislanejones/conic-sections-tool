declare module "react-plotly.js" {
  import * as React from "react";
  import {
    Layout,
    Data,
    Config,
    Frames,
    PlotlyHTMLElement,
    Figure,
  } from "plotly.js";

  export interface PlotParams {
    data: Data[];
    layout?: Partial<Layout>;
    config?: Partial<Config>;
    frames?: Frames[];
    useResizeHandler?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onInitialized?: (
      figure: Readonly<Figure>,
      graphDiv: PlotlyHTMLElement
    ) => void;
    onUpdate?: (figure: Readonly<Figure>, graphDiv: PlotlyHTMLElement) => void;
    onPurge?: (graphDiv: PlotlyHTMLElement) => void;
    onError?: (err: any) => void;
    divId?: string;
  }

  const Plot: React.FC<PlotParams>;
  export default Plot;
}
