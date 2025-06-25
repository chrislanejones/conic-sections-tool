"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Share2, Download, Copy, FileJson } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">Conic Sections</h1>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-foreground">Conic Sections</h1>
      <div className="flex items-center space-x-2">
        {/* Export Menu */}
        <div className="relative">
          <button
            className="p-2 rounded-lg transition-colors bg-primary hover:bg-input border border-gray-600 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Export options"
          >
            <Share2 size={20} />
          </button>

          {menuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />

              {/* Menu */}
              <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg border bg-foreground border-gray-600 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      copyToClipboard(equationJSON);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Copy className="mr-2 text-gray-300" size={16} />
                    Copy Equation (JSON)
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
                      URL.revokeObjectURL(url);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <FileJson className="mr-2 text-gray-300" size={16} />
                    Export Equation (JSON)
                  </button>

                  <button
                    onClick={() => {
                      downloadPlotlyChart("plotly-chart", "png");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Download className="mr-2 text-gray-300" size={16} />
                    Export Graph (PNG)
                  </button>

                  <button
                    onClick={() => {
                      downloadPlotlyChart("plotly-chart", "svg");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Download className="mr-2 text-gray-300" size={16} />
                    Export Graph (SVG)
                  </button>

                  <button
                    onClick={() => {
                      exportPlotDataAsCSV(plotData);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Download className="mr-2 text-gray-300" size={16} />
                    Export Data (CSV)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg transition-colors bg-primary hover:bg-muted border border-gray-600 text-white"
          aria-label="Toggle dark mode"
        >
          {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
