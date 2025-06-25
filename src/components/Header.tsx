"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Share2 } from "lucide-react";
import {
  downloadPlotlyChart,
  exportPlotDataAsCSV,
  copyToClipboard,
} from "@/utils/exportUtils";

interface HeaderProps {
  plotData: any[];
  equationJSON: string;
}

export default function Header({ plotData, equationJSON }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Optional: Prevent mismatch on first render
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Conic Sections</h1>
      <div className="flex items-center space-x-2">
        {/* Share Button */}
        <div className="relative">
          <button
            className="p-2 rounded-lg transition-colors bg-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Share2 size={20} />
          </button>
          {menuOpen && (
            <div className="export-menu absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50">
              <div className="py-1 text-sm">
                <button
                  onClick={() => copyToClipboard(equationJSON)}
                  className="w-full text-left px-4 py-2 flex items-center"
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
                  className="w-full text-left px-4 py-2 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Equation (JSON)
                </button>
                <button
                  onClick={() => downloadPlotlyChart("plotly-chart", "png")}
                  className="w-full text-left px-4 py-2 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Graph (PNG)
                </button>
                <button
                  onClick={() => downloadPlotlyChart("plotly-chart", "svg")}
                  className="w-full text-left px-4 py-2 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Graph (SVG)
                </button>
                <button
                  onClick={() => exportPlotDataAsCSV(plotData)}
                  className="w-full text-left px-4 py-2 flex items-center"
                >
                  <Share2 className="mr-2" size={16} /> Export Data (CSV)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg transition-colors bg-background border text-foreground"
          aria-label="Toggle dark mode"
        >
          {resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </div>
  );
}
