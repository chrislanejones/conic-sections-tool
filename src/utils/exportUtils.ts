import type { ExportData } from "@/types";

export const exportToJSON = (data: ExportData): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.type}-equation-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const shareToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-HTTPS contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

export const generateShareText = (
  conicType: string,
  equation: string,
  parameters: any
): string => {
  const paramString = Object.entries(parameters)
    .map(([key, value]) => `${key} = ${value}`)
    .join(", ");

  return `🔢 Check out this ${conicType}!

📐 Equation: ${equation}

⚙️ Parameters: ${paramString}

🎯 Created with Interactive Conic Sections Tool
🌐 https://conic-sections.vercel.app

#Mathematics #ConicSections #Education #Interactive`;
};

export const exportImage = (
  canvas: HTMLCanvasElement,
  filename: string
): void => {
  canvas.toBlob(
    (blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    },
    "image/png",
    0.95
  );
};
