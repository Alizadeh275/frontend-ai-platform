"use client";

import { CodeCell } from "./CodeCell/CodeCell";
import { TextCell } from "./TextCellV2";
import { Cell } from "./types";

interface Props {
  cells: Cell[];
  selectedCellId: string | null;
  setSelectedCellId: (id: string) => void;

  runCell: (id: string) => void;
  deleteCell: (id: string) => void;
  moveCellUp: (id: string) => void;
  moveCellDown: (id: string) => void;
  addCellBelow: (targetCellId: string, type: "code" | "text") => void;

  updateCellContent: (id: string, value: string) => void;
}

export function CellList({
  cells,
  selectedCellId,
  setSelectedCellId,
  runCell,
  deleteCell,
  moveCellUp,
  moveCellDown,
  addCellBelow,
  updateCellContent,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-2 px-4 py-6">
        {cells.map((cell) =>
          cell.type === "code" ? (
            <CodeCell
              key={cell.id}
              code={cell.content}
              output={cell.output}
              hasChart={cell.hasChart}
              executionStatus={cell.executionStatus}
              executionTime={cell.executionTime}
              isSelected={cell.id === selectedCellId}
              onSelect={() => setSelectedCellId(cell.id)}
              onRun={() => runCell(cell.id)}
              onDelete={() => deleteCell(cell.id)}
              onMoveUp={() => moveCellUp(cell.id)}
              onMoveDown={() => moveCellDown(cell.id)}
              onAddBelowCode={() => addCellBelow(cell.id, "code")}
              onAddBelowText={() => addCellBelow(cell.id, "text")}
            />
          ) : (
            <TextCell
              key={cell.id}
              content={cell.content}
              isSelected={cell.id === selectedCellId}
              onSelect={() => setSelectedCellId(cell.id)}
              onDelete={() => deleteCell(cell.id)}
              onMoveUp={() => moveCellUp(cell.id)}
              onMoveDown={() => moveCellDown(cell.id)}
              onAddBelowCode={() => addCellBelow(cell.id, "code")}
              onAddBelowText={() => addCellBelow(cell.id, "text")}
              onChangeContent={(value) => updateCellContent(cell.id, value)}
            />
          ),
        )}
      </div>
    </div>
  );
}
