"use client";

import { useEffect, useState } from "react";
import {
  MoreVertical,
  Trash2,
  Pencil,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  Copy,
  Type,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";

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
      className={`group relative mb-6 transition-all duration-200
        ${isSelected ? "scale-[1.002]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Cell Container with Modern Shadow */}
      <div
        className={`rounded-xl border transition-all duration-200 overflow-hidden
          ${
            isSelected
              ? "border-emerald-400/50 shadow-lg shadow-emerald-100/50 bg-white"
              : "border-gray-200/80 hover:border-gray-300 hover:shadow-md bg-white/95"
          }`}
      >
        {/* Header with Gradient Background */}
        <div
          className={`flex items-center justify-between px-4 py-3 transition-colors
            ${
              isSelected
                ? "bg-gradient-to-r from-emerald-50/80 to-gray-50/80 border-b border-emerald-100/50"
                : "bg-gradient-to-r from-gray-50/50 to-gray-50/30 border-b border-gray-100"
            }`}
        >
          {/* Left Side: Text Icon & Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400"></div>
              <span className="text-xs font-semibold text-gray-700 tracking-wide">
                متن
              </span>
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div
            className={`flex items-center gap-1 transition-opacity duration-200
              ${isSelected || isHovered ? "opacity-100" : "opacity-0"}`}
          >
            {isEditing ? (
              <>
                <ToolbarButton
                  icon={<Check className="w-4 h-4" />}
                  title="ذخیره"
                  onClick={() => {
                    finishEdit();
                  }}
                />
                <ToolbarButton
                  icon={<X className="w-4 h-4" />}
                  title="لغو"
                  danger
                  onClick={() => {
                    setValue(content);
                    setIsEditing(false);
                  }}
                />
              </>
            ) : (
              <>
                <ToolbarButton
                  icon={<Pencil className="w-4 h-4" />}
                  title="ویرایش متن"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
                <ToolbarButton
                  icon={<Copy className="w-4 h-4" />}
                  title="کپی متن"
                  onClick={() => {
                    navigator.clipboard.writeText(content);
                  }}
                />
                <ToolbarButton
                  icon={<Trash2 className="w-4 h-4" />}
                  title="حذف سلول"
                  danger
                  onClick={() => {
                    onDelete?.();
                  }}
                />
                <ToolbarButton
                  icon={<ChevronUp className="w-4 h-4" />}
                  title="انتقال به بالا"
                  onClick={() => {
                    onMoveUp?.();
                  }}
                />
                <ToolbarButton
                  icon={<ChevronDown className="w-4 h-4" />}
                  title="انتقال به پایین"
                  onClick={() => {
                    onMoveDown?.();
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          <div
            className={`relative rounded-lg transition-all duration-200 min-h-[50px]
              ${isSelected ? "ring-1 ring-emerald-200/50" : ""}`}
          >
            {/* Content Editor/Viewer */}
            {isEditing ? (
              <div className="relative">
                {/* Edit Mode */}
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
                    w-full min-h-[50px] max-h-[400px]
                    resize-y
                    p-4
                    text-right
                    border border-emerald-200/50
                    rounded-lg
                    focus:ring-2 focus:ring-emerald-500/20
                    outline-none
                    bg-white/80
                    text-gray-800
                    leading-relaxed
                    text-sm
                    transition-all duration-200
                  "
                  placeholder="متن خود را وارد کنید..."
                  dir="rtl"
                />
                <div className="absolute bottom-2 left-2 text-xs text-gray-500">
                  برای ذخیره: Ctrl+Enter
                </div>
              </div>
            ) : (
              /* View Mode */
              <div
                className="prose prose-sm max-w-none cursor-text"
                dir="rtl"
                onDoubleClick={() => setIsEditing(true)}
              >
                <div className="text-gray-800 whitespace-pre-wrap leading-7 text-right p-2 hover:bg-gray-50/50 rounded-lg transition-colors">
                  {content || (
                    <div className="text-gray-400 italic text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                      برای ویرایش دوبار کلیک کنید
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Edit Indicator */}
            {isEditing && (
              <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 animate-pulse">
                <Pencil className="w-3 h-3 text-emerald-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Cell Buttons - Consistent with CodeCell */}
      <div className="relative h-8">
        <div
          className={`absolute inset-x-0 top-1/4 -translate-y-1/2 flex justify-center transition-all duration-200
            ${isSelected || isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-lg border border-gray-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddBelowCode?.();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"></div>
              افزودن کد
            </button>

            <div className="w-px h-4 bg-gray-300"></div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddBelowText?.();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400"></div>
              افزودن متن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
