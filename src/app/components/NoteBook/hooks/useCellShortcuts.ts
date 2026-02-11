"use client";

import { useEffect } from "react";
import { Cell } from "../Cells/types";

interface Props {
  cells: Cell[];
  selectedCellId: string | null;
  onRun: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onEdit: (id: string) => void;
}

export function useCellShortcuts({
  cells,
  selectedCellId,
  onRun,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedCellId) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        onDelete(selectedCellId);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "ArrowUp") {
        e.preventDefault();
        onMoveUp(selectedCellId);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "ArrowDown") {
        e.preventDefault();
        onMoveDown(selectedCellId);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault();
        onEdit(selectedCellId);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        const cell = cells.find((c) => c.id === selectedCellId);
        if (cell?.type === "code") {
          e.preventDefault();
          onRun(selectedCellId);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cells, selectedCellId]);
}
