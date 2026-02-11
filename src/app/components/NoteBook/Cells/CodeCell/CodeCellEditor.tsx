import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubLight } from "@uiw/codemirror-theme-github";
import { Check } from "lucide-react";
import { ExecutionStatus } from "./types";

interface Props {
  code: string;
  isSelected: boolean;
  executionStatus: ExecutionStatus;
  onChangeCode?: (value: string) => void;
}

export function CodeCellEditor({
  code,
  isSelected,
  executionStatus,
  onChangeCode,
}: Props) {
  return (
    <div className="p-1">
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
          isSelected ? "ring-1 ring-purple-200/50" : ""
        }`}
      >
        {/* Editor Line Numbers Background */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-b from-gray-50/80 to-gray-50/50 border-r border-gray-100" />

        {/* CodeMirror Editor */}
        <div className="px-10">
          <CodeMirror
            value={code}
            extensions={[python()]}
            theme={githubLight}
            editable={isSelected}
            onChange={(value) => onChangeCode?.(value)}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: isSelected,
              highlightSelectionMatches: isSelected,
              autocompletion: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
            }}
            style={{
              direction: "ltr",
              textAlign: "left",
              fontSize: "13.5px",
              fontFamily: '"Fira Code", "JetBrains Mono", monospace',
              backgroundColor: "transparent",
              lineHeight: "1.5",
            }}
            className="!pt-3 !pb-3"
          />
        </div>

        {/* Status Indicator */}
        {executionStatus !== "idle" && (
          <div className="absolute right-3 top-3">
            {executionStatus === "success" && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            )}
            {executionStatus === "error" && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100">
                <span className="text-xs font-bold text-rose-600">!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
