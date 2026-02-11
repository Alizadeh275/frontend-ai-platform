"use client";

import { Cell } from "./Cells/types";

export function ExecutionIndicator({ cells }: { cells: Cell[] }) {
  if (!cells.some((c) => c.executionStatus === "running")) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 animate-pulse">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>در حال اجرا...</span>
    </div>
  );
}
