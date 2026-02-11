"use client";

import {
  Clock,
  Plus,
  Play,
  Square,
  RotateCcw,
  Save,
  Download,
  Upload,
  Settings,
} from "lucide-react";

interface SecondaryToolbarProps {
  onAddCodeCell?: () => void;
  onAddTextCell?: () => void;
  onRunAll?: () => void;
  onStopAll?: () => void;
  onRestartAll?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
  onUpload?: () => void;
  onSettings?: () => void;
  lastSaveTime?: string;
  isConnected?: boolean;
}

export function SecondaryToolbar({
  onAddCodeCell,
  onAddTextCell,
  onRunAll,
  onStopAll,
  onRestartAll,
  onSave,
  onDownload,
  onUpload,
  onSettings,
  lastSaveTime = "2 دقیقه پیش",
  isConnected = true,
}: SecondaryToolbarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-50/80 to-white/50 border-t border-gray-100/80">
      {/* Left Side: Cell Actions & File Operations */}
      <div className="flex items-center gap-3">
        {/* Add Cell Buttons */}
        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200/80 shadow-sm px-1 py-1">
          <button
            onClick={onAddCodeCell}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"></div>
              <span>افزودن کد</span>
            </div>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
          </button>

          <div className="w-px h-4 bg-gray-300/50"></div>

          <button
            onClick={onAddTextCell}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400"></div>
              <span>افزودن متن</span>
            </div>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
          </button>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-gray-300/50 to-transparent"></div>

        {/* File Operations */}
        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200/80 shadow-sm px-1 py-1">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
            title="ذخیره پروژه"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره</span>
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
            title="دانلود پروژه"
          >
            <Download className="w-4 h-4" />
            <span>دانلود</span>
          </button>

          <button
            onClick={onUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200"
            title="آپلود فایل"
          >
            <Upload className="w-4 h-4" />
            <span>آپلود</span>
          </button>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-gray-300/50 to-transparent"></div>

        {/* Execution Controls */}
        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200/80 shadow-sm px-2 py-1">
          <button
            onClick={onRunAll}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="اجرای همه سلول‌ها"
            disabled={!isConnected}
          >
            <Play className="w-4 h-4" fill="white" />
            <span>اجرای همه</span>
          </button>

          <button
            onClick={onStopAll}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="توقف اجرا"
            disabled={!isConnected}
          >
            <Square className="w-4 h-4" />
            <span>توقف</span>
          </button>

          <button
            onClick={onRestartAll}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="ریستارت کرنل"
            disabled={!isConnected}
          >
            <RotateCcw className="w-4 h-4" />
            <span>ریستارت</span>
          </button>
        </div>
      </div>

      {/* Right Side: Status & Settings */}
      <div className="flex items-center gap-3">
        {/* Settings Button */}
        <button
          onClick={onSettings}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200/80 shadow-sm hover:shadow transition-all duration-200"
          title="تنظیمات"
        >
          <Settings className="w-4 h-4 text-gray-600" />
        </button>

        {/* Last Save Time */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-500" />
            <div className="text-xs text-gray-700">
              <span className="font-medium">آخرین ذخیره:</span>
              <span className="mr-1"> {lastSaveTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
