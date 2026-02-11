import { useEffect, useState } from "react";
import {
  MoreVertical,
  Trash2,
  Pencil,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import { AddCellButtons } from "./AddCellButtons";

interface TextCellProps {
  content: string;

  isSelected?: boolean;
  onSelect?: () => void;

  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onAddBelowCode?: () => void;
  onAddBelowText?: () => void;

  onChangeContent: (value: string) => void;
}

export function TextCell({
  content,
  isSelected = false,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  onAddBelowCode,
  onAddBelowText,
  onChangeContent,
}: TextCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const finishEdit = () => {
    setIsEditing(false);
    if (value.trim() !== content) {
      onChangeContent(value.trim());
    }
  };

  return (
    <div
      className={`cursor-pointer group relative mb-5 rounded-lg transition-shadow border ${
        isSelected
          ? "border-blue-500 shadow-md"
          : "border-gray-200 hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      onDoubleClick={() => setIsEditing(true)}
    >
      {/* Floating Toolbar */}
      <div
        className={`
          absolute -top-4 left-3 flex items-center gap-1
          rounded-md shadow-sm px-1 py-0.5 transition-opacity z-2
          border
          ${isSelected ? "opacity-100" : "opacity-0"}
          ${
            isSelected
              ? "bg-blue-50 border-blue-300"
              : "bg-gray-100 border-gray-200"
          }
        `}
      >
        <ToolbarButton
          icon={<ChevronUp className="w-4 h-4" />}
          title="بالا"
          onClick={onMoveUp}
        />
        <ToolbarButton
          icon={<ChevronDown className="w-4 h-4" />}
          title="پایین"
          onClick={onMoveDown}
        />
        <ToolbarButton
          icon={<Trash2 className="w-4 h-4" />}
          title="حذف"
          danger
          onClick={onDelete}
        />
        <ToolbarButton
          icon={<MoreVertical className="w-4 h-4" />}
          title="بیشتر"
        />
      </div>
      {/* Main Row */}
      <div className="flex">
        {/* Right spacing for symmetry */}
        <div className="w-6"></div>

        {/* Content */}
        <div className="flex-1 py-5 pr-0">
          {isEditing ? (
            <textarea
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={finishEdit}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setValue(content);
                  setIsEditing(false);
                }
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  finishEdit();
                }
              }}
              className="
          w-full min-h-[80px]
          resize-none
          p-2
          border border-transparent
          focus:ring-0
          outline-none
        "
              placeholder="متن خود را وارد کنید..."
            />
          ) : (
            <div className="prose max-w-none text-right">
              <p className="text-gray-800 whitespace-pre-wrap leading-6">
                {content || "برای ویرایش دوبار کلیک کنید"}
              </p>
            </div>
          )}
        </div>

        <div className="w-6" />
      </div>

      {/* Add cell buttons */}
      <AddCellButtons
        isSelected={isSelected}
        onAddBelowCode={onAddBelowCode}
        onAddBelowText={onAddBelowText}
      />
    </div>
  );
}
