"use client";

import {
  ChevronDown,
  Cpu,
  HardDrive,
  Share2,
  User,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { MenuDropdown } from "./MenuDropdown";

interface MainHeaderProps {
  projectName: string;
  ramUsage: string;
  diskUsage: string;
  runtimeStatus: "connected" | "connecting" | "disconnected";
  username: string | null;
}

export function MainHeader({
  projectName,
  ramUsage,
  diskUsage,
  runtimeStatus,
  username,
}: MainHeaderProps) {
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const menus = [
    { label: "فایل", items: ["جدید", "باز کردن", "ذخیره", "دانلود"] },
    {
      label: "ویرایش",
      items: ["برش", "کپی", "چسباندن", "حذف سلول انتخابی", "پاکسازی خروجی‌ها"],
    },
    { label: "نمایش", items: ["کد", "خروجی", "نوار ابزار"] },
    { label: "درج", items: ["سلول کد", "سلول متن"] },
    { label: "اجرا", items: ["اجرای همه", "اجرای انتخاب شده", "توقف"] },
    { label: "ابزارها", items: ["تنظیمات", "میانبرها"] },
    { label: "راهنما", items: ["مستندات", "درباره"] },
  ];

  // Status colors matching CodeCell
  const statusColors = {
    connected: {
      bg: "bg-gradient-to-r from-emerald-50 to-emerald-100/50",
      text: "text-emerald-700",
      border: "border-emerald-200/80",
      dot: "bg-gradient-to-r from-emerald-500 to-green-400",
    },
    connecting: {
      bg: "bg-gradient-to-r from-amber-50 to-amber-100/50",
      text: "text-amber-700",
      border: "border-amber-200/80",
      dot: "bg-gradient-to-r from-amber-500 to-orange-400 animate-pulse",
    },
    disconnected: {
      bg: "bg-gradient-to-r from-gray-100 to-gray-50/50",
      text: "text-gray-700",
      border: "border-gray-200/80",
      dot: "bg-gradient-to-r from-gray-400 to-gray-500",
    },
  };

  const currentStatus = statusColors[runtimeStatus];

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-white to-gray-50/30 border-b border-gray-100/80">
      {/* Right side - Project Info & Menus */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
            {projectName}
          </h1>
          <button className="cursor-pointer p-1 hover:bg-gray-100/80 rounded-lg transition-colors">
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="h-8 w-px bg-gradient-to-b from-gray-300/50 to-transparent"></div>

        <div className="flex gap-1">
          {menus.map((menu, i) => (
            <MenuDropdown
              key={i}
              label={menu.label}
              items={menu.items}
              variant="modern"
            />
          ))}
        </div>
      </div>

      {/* Left side - Status & Actions */}
      <div className="flex items-center gap-3">
        {/* RAM Usage */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-50/30 border border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-blue-500" />
            <div className="text-xs">
              <div className="font-medium text-gray-700">رم: {ramUsage}</div>
            </div>
          </div>
        </div>

        {/* Disk Usage */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-50/30 border border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-violet-500" />
            <div className="text-xs">
              <div className="font-medium text-gray-700">دیسک: {diskUsage}</div>
            </div>
          </div>
        </div>

        {/* Runtime Status */}
        <div className="relative group">
          <button
            className={`
              cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              border shadow-sm transition-all duration-200 hover:shadow
              ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}
            `}
          >
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${currentStatus.dot}`} />
              <span>
                {runtimeStatus === "connected"
                  ? "متصل"
                  : runtimeStatus === "connecting"
                    ? "در حال اتصال..."
                    : "قطع شده"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-current" />
          </button>

          <div className="absolute right-0 top-full mt-0.5 w-64 bg-white border border-gray-200/80 rounded-xl shadow-lg overflow-hidden hidden group-hover:block z-50">
            {[
              "اتصال به محیط اجرا",
              "قطع اتصال",
              "اتصال مجدد",
              "ریست کامل محیط اجرا",
              "تغییر نوع محیط اجرا (CPU / GPU / TPU)",
              "مدیریت نشست‌ها",
              "مشاهده منابع مصرفی",
            ].map((item, i) => (
              <button
                key={i}
                className="cursor-pointer w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-l hover:from-gray-50 hover:to-white border-b border-gray-100/50 last:border-0 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-sm hover:shadow transition-all duration-200">
          <Share2 className="w-4 h-4" />
          اشتراک‌گذاری
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div
            className="cursor-pointer w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-sm hover:shadow transition-shadow"
            title={username ?? "کاربر"}
          >
            <User className="w-5 h-5 text-white" />
          </div>

          <button
            onClick={() => setOpenLogoutConfirm(true)}
            title="خروج"
            className="cursor-pointer p-2 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50/80 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
