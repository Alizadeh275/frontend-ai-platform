"use client";

import { PanelRightClose, PanelRightOpen } from "lucide-react";

export function SidebarToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onToggle(!open)}
      className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-white to-gray-50 border border-gray-200/80 shadow-lg rounded-xl flex items-center justify-center z-50 hover:shadow-xl hover:scale-105 transition-all duration-200 group"
    >
      <div className="relative">
        {open ? (
          <PanelRightClose className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
        ) : (
          <PanelRightOpen className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
        )}
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </button>
  );
}
