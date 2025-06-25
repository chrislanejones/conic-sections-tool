import Plotly from "plotly.js-dist-min";

export async function downloadPlotlyChart(
  id = "plotly-chart",
  format: "png" | "svg" = "png"
) {
  const chartDiv = document.getElementById(id);
  if (!chartDiv) {
    console.warn(`No element with id '${id}' found.`);
    return;
  }

  const fileOpts = {
    format,
    filename: `conic-plot-${new Date().toISOString()}`,
    height: chartDiv.clientHeight || 600,
    width: chartDiv.clientWidth || 800,
    scale: 2,
  };

  try {
    await Plotly.downloadImage(chartDiv as any, fileOpts);
  } catch (err) {
    console.error("Plotly download failed:", err);
  }
}

export function exportPlotDataAsCSV(data: any[], filename = "conic-data.csv") {
  if (!data?.length) return;

  const x = data[0]?.x || [];
  const y = data[0]?.y || [];

  let csv = "x,y\n";
  for (let i = 0; i < x.length; i++) {
    csv += `${x[i]},${y[i]}\n`;
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => console.log("Copied to clipboard"),
    (err) => console.error("Clipboard copy failed:", err)
  );
}
