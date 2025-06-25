import React, { useState } from "react";
import {
  downloadPlotlyChart,
  exportPlotDataAsCSV,
  copyToClipboard,
} from "@/utils/exportUtils";
import { Moon, Sun, Share2 } from "lucide-react";

interface HeaderProps {
  plotData: any[];
  equationJSON: string;
}

export default function Header({ plotData, equationJSON }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Conic Sections</h1>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            className="p-2 rounded-lg transition-colors bg-gray-700 hover:bg-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Share2 size={20} />
          </button>
          {menuOpen && (
            <div className="export-menu absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50 bg-gray-800 border-gray-700">
              <div className="py-1 text-sm">
                <button
                  onClick={() => copyToClipboard(equationJSON)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Copy Equation (JSON)
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([equationJSON], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "conic-equation.json";
                    link.click();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Equation (JSON)
                </button>
                <button
                  onClick={() => downloadPlotlyChart("plotly-chart", "png")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Graph (PNG)
                </button>
                <button
                  onClick={() => downloadPlotlyChart("plotly-chart", "svg")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Graph (SVG)
                </button>
                <button
                  onClick={() => exportPlotDataAsCSV(plotData)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Data (CSV)
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors bg-gray-700 hover:bg-gray-600"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
