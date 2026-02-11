"use client";

import { useState } from "react";
import {
  Play,
  Check,
  Circle,
  Trash2,
  MoreVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubLight } from "@uiw/codemirror-theme-github";

import { ChartOutput } from "./ChartOutput";
import ToolbarButton from "./ToolbarButton";
import { AddCellButtons } from "./AddCellButtons";

interface CodeCellProps {
  code: string;
  output?: string;
  hasChart?: boolean;
  executionStatus?: "idle" | "running" | "success" | "error";
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
}: CodeCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // ⬇️ isolate cell from RTL app
    <div
      dir="ltr"
      className={`group relative mb-5 rounded-lg border transition-shadow
        ${
          isSelected
            ? "border-blue-500 shadow-md"
            : "border-gray-200 hover:shadow-md"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Floating Toolbar */}
      <div
        className={`absolute -top-4 right-3 z-10 flex gap-1 rounded-md border px-1 py-0.5 shadow-sm
          ${
            isSelected
              ? "opacity-100 bg-blue-50 border-blue-300"
              : "opacity-0 bg-gray-100 border-gray-200"
          }`}
      >
        <ToolbarButton
          icon={<MoreVertical className="w-4 h-4" />}
          title="More"
        />
        <ToolbarButton
          icon={<Trash2 className="w-4 h-4" />}
          title="Delete"
          danger
          onClick={onDelete}
        />
        <ToolbarButton
          icon={<ChevronUp className="w-4 h-4" />}
          title="Move up"
          onClick={onMoveUp}
        />
        <ToolbarButton
          icon={<ChevronDown className="w-4 h-4" />}
          title="Move down"
          onClick={onMoveDown}
        />
      </div>

      {/* MAIN ROW */}
      <div className="flex items-stretch">
        {/* RUN GUTTER — LEFT */}
        <div className="flex w-14 flex-col items-center pt-3 bg-gray-50 rounded-l-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRun?.();
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition
              ${
                isHovered || isSelected || executionStatus === "running"
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "opacity-0"
              }`}
          >
            {executionStatus === "running" ? (
              <Circle className="h-4 w-4 animate-pulse text-orange-500" />
            ) : (
              <Play className="h-4 w-4 text-gray-700" />
            )}
          </button>

          {executionStatus === "success" && (
            <Check className="mt-2 h-4 w-4 text-green-600" />
          )}
        </div>

        {/* CODE EDITOR */}
        <div className="cursor-pointer flex-1 py-4 pr-3">
          <CodeMirror
            value={code}
            extensions={[python()]}
            theme={githubLight}
            editable={isSelected}
            onChange={(value) => onChangeCode?.(value)}
            basicSetup={{
              lineNumbers: false,
              foldGutter: true,
              highlightActiveLine: false,
              highlightSelectionMatches: false,
            }}
            style={{
              direction: "ltr",
              textAlign: "left",
              fontSize: 13,
              backgroundColor: "#f9fafb",
              borderRadius: 8,
            }}
          />
        </div>
      </div>

      {/* OUTPUT */}
      {(output || hasChart) && (
        <div className="border-t border-gray-200 px-14 py-3">
          {hasChart && <ChartOutput />}

          {output && (
            <pre className="rounded bg-white p-3 font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          )}

          {executionTime && (
            <div className="mt-2 text-right text-xs text-gray-500" dir="rtl">
              زمان اجرا: {executionTime}
            </div>
          )}
        </div>
      )}

      {/* ADD CELL BUTTONS */}
      <AddCellButtons
        isSelected={isSelected}
        onAddBelowCode={onAddBelowCode}
        onAddBelowText={onAddBelowText}
      />
    </div>
  );
}
