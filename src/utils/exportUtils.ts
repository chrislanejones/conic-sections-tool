// Client-side only export utilities
export async function downloadPlotlyChart(
  id = "plotly-chart",
  format: "png" | "svg" = "png"
) {
  // Only run on client side
  if (typeof window === "undefined") {
    console.warn("downloadPlotlyChart can only be called on the client side");
    return;
  }

  const chartDiv = document.getElementById(id);
  if (!chartDiv) {
    console.warn(`No element with id '${id}' found.`);
    return;
  }

  try {
    // Dynamic import of Plotly with type assertion
    const Plotly = (await import("plotly.js-dist-min")) as any;

    const fileOpts = {
      format,
      filename: `conic-plot-${new Date().toISOString()}`,
      height: chartDiv.clientHeight || 600,
      width: chartDiv.clientWidth || 800,
      scale: 2,
    };

    // Use Plotly.downloadImage
    await Plotly.downloadImage(chartDiv, fileOpts);
  } catch (err) {
    console.error("Plotly download failed:", err);
  }
}

export function exportPlotDataAsCSV(data: any[], filename = "conic-data.csv") {
  // Only run on client side
  if (typeof window === "undefined") {
    console.warn("exportPlotDataAsCSV can only be called on the client side");
    return;
  }

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
  // Only run on client side
  if (typeof window === "undefined") {
    console.warn("copyToClipboard can only be called on the client side");
    return;
  }

  navigator.clipboard.writeText(text).then(
    () => console.log("Copied to clipboard"),
    (err) => console.error("Clipboard copy failed:", err)
  );
}
