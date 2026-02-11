"use client";

import { useState } from "react";
import { CodeCellHeader } from "./CodeCellHeader";
import { CodeCellEditor } from "./CodeCellEditor";
import { CodeCellOutput } from "./CodeCellOutput";
import { CodeCellAddButtons } from "./CodeCellAddButtons";
import { ExecutionStatus } from "./types";

interface CodeCellProps {
  code: string;
  output?: string;
  hasChart?: boolean;
  executionStatus?: ExecutionStatus;
  executionTime?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onRun?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onChangeCode?: (value: string) => void;
  onAddBelowCode?: () => void;
  onAddBelowText?: () => void;
  onCopyCode?: () => void;
}

export function CodeCell({
  code,
  output,
  hasChart,
  executionStatus = "idle",
  executionTime,
  isSelected = false,
  onSelect,
  onRun,
  onDelete,
  onMoveUp,
  onMoveDown,
  onChangeCode,
  onAddBelowCode,
  onAddBelowText,
  onCopyCode,
}: CodeCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      dir="ltr"
      className={`group relative mb-6 transition-all duration-200 ${
        isSelected ? "scale-[1.002]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <div
        className={`rounded-xl border transition-all duration-200 overflow-hidden
          ${
            isSelected
              ? "border-blue-400/50 shadow-lg shadow-blue-100/50 bg-white"
              : "border-gray-200/80 hover:border-gray-300 hover:shadow-md bg-white/95"
          }`}
      >
        <CodeCellHeader
          executionStatus={executionStatus}
          executionTime={executionTime}
          isSelected={isSelected}
          isHovered={isHovered}
          onRun={onRun}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onCopyCode={onCopyCode}
        />

        <CodeCellEditor
          code={code}
          isSelected={isSelected}
          executionStatus={executionStatus}
          onChangeCode={onChangeCode}
        />

        <CodeCellOutput
          output={output}
          hasChart={hasChart}
          executionTime={executionTime}
          isSelected={isSelected}
        />
      </div>

      <CodeCellAddButtons
        isVisible={isSelected || isHovered}
        onAddBelowCode={onAddBelowCode}
        onAddBelowText={onAddBelowText}
      />
    </div>
  );
}
