import { Clock, Copy } from "lucide-react";
import ToolbarButton from "../ToolbarButton";
import { ChartOutput } from "../ChartOutput";

interface Props {
  output?: string;
  hasChart?: boolean;
  executionTime?: string;
  isSelected: boolean;
}

export function CodeCellOutput({
  output,
  hasChart,
  executionTime,
  isSelected,
}: Props) {
  if (!output && !hasChart) return null;

  return (
    <div
      className={`border-t transition-colors ${
        isSelected
          ? "border-purple-100/50 bg-gradient-to-b from-purple-50/20 to-white"
          : "border-gray-100 bg-gray-50/50"
      }`}
    >
      {/* Output Header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
          <span className="text-xs font-medium text-gray-700">OUTPUT</span>
        </div>

        {executionTime && !isSelected && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{executionTime}</span>
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="px-4 pb-4">
        {hasChart && (
          <div className="mb-4">
            <ChartOutput />
          </div>
        )}

        {output && (
          <div className="relative group">
            <pre className="rounded-xl bg-white p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap border border-gray-100 shadow-sm overflow-x-auto">
              {output}
            </pre>
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ToolbarButton
                icon={<Copy className="w-3.5 h-3.5" />}
                title="Copy output"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
