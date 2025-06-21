import { ExportData } from "../types";

export const exportToJSON = (data: ExportData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.type}-equation.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const shareToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  }
};

export const generateShareText = (
  conicType: string,
  equation: string,
  parameters: any
): string => {
  return `Check out this ${conicType}!

Equation: ${equation}

Parameters:
${Object.entries(parameters)
  .map(([key, value]) => `${key} = ${value}`)
  .join(", ")}

Created with Conic Sections Interactive Tool`;
};
