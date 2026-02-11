import {
  Play,
  Circle,
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
  Clock,
} from "lucide-react";
import ToolbarButton from "../ToolbarButton";
import { ExecutionStatus } from "./types";

const statusColors: Record<ExecutionStatus, string> = {
  idle: "text-gray-400",
  running: "text-amber-500 animate-pulse",
  success: "text-emerald-500",
  error: "text-rose-500",
};

interface Props {
  executionStatus: ExecutionStatus;
  executionTime?: string;
  isSelected: boolean;
  isHovered: boolean;
  onRun?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onCopyCode?: () => void;
}

export function CodeCellHeader({
  executionStatus,
  executionTime,
  isSelected,
  isHovered,
  onRun,
  onDelete,
  onMoveUp,
  onMoveDown,
  onCopyCode,
}: Props) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 transition-colors
        ${
          isSelected
            ? "bg-gradient-to-r from-purple-50/80 to-gray-50/80 border-b border-purple-100/50"
            : "bg-gradient-to-r from-gray-50/50 to-gray-50/30 border-b border-gray-100"
        }`}
    >
      {/* Left Side: Language & Status */}
      <div className="flex items-center gap-3">
        {executionStatus !== "idle" && (
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${statusColors[executionStatus]}`}
            />
            <span className="text-xs text-gray-600 capitalize">
              {executionStatus}
            </span>
          </div>
        )}
      </div>

      {/* Right Side: Action Buttons */}
      <div
        className={`flex items-center gap-1 transition-opacity duration-200
          ${isSelected || isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {executionTime && (
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-md bg-gray-100/80">
            <Clock className="w-3 h-3 text-gray-600" />
            <span className="text-xs text-gray-700 font-medium">
              {executionTime}
            </span>
          </div>
        )}

        <ToolbarButton
          icon={<Copy className="w-4 h-4" />}
          title="Copy code"
          onClick={() => {
            onCopyCode?.();
          }}
        />

        <ToolbarButton
          icon={<Trash2 className="w-4 h-4" />}
          title="Delete cell"
          danger
          onClick={() => {
            onDelete?.();
          }}
        />

        <ToolbarButton
          icon={<ChevronUp className="w-4 h-4" />}
          title="Move up"
          onClick={() => {
            onMoveUp?.();
          }}
        />

        <ToolbarButton
          icon={<ChevronDown className="w-4 h-4" />}
          title="Move down"
          onClick={() => {
            onMoveDown?.();
          }}
        />

        <div className="w-px h-4 bg-gray-300/50 mx-1"></div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRun?.();
          }}
          className={`flex text-right items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200
            ${
              executionStatus === "running"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                : "bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 text-white shadow-sm hover:shadow"
            }`}
        >
          {executionStatus === "running" ? (
            <>
              <Circle className="w-3 h-3 animate-pulse" />
              درحال اجرا...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" fill="white" />
              اجرا
            </>
          )}
        </button>
      </div>
    </div>
  );
}
