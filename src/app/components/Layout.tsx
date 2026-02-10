import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  GitBranch,
  Database,
  Box,
  Activity,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
  Cpu,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import LogoutModal from "@/app/components/Auth/components/LogoutModal";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: any) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Layout({
  children,
  currentPage,
  setCurrentPage,
  theme,
  toggleTheme,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigation = [
    { id: "dashboard", name: "داشبورد اصلی", icon: LayoutDashboard },
    { id: "notebooks", name: "سرورهای نوت‌بوک", icon: BookOpen },
    { id: "pipelines", name: "پایپ‌لاین‌ها", icon: GitBranch },
    { id: "datasets", name: "دیتاست‌ها", icon: Database },
    { id: "models", name: "مدل‌ها", icon: Box },
    { id: "gpu", name: "مانیتورینگ GPU", icon: Activity },
    { id: "settings", name: "تنظیمات", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  پلتفرم هوش مصنوعی
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  AI Infrastructure Platform
                </p>
              </div>
            </div>
          </div>

          {/* Center - Workspace Selector */}
          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 min-w-[200px] justify-between"
                >
                  <div className="text-right">
                    <div className="text-sm font-medium">محیط توسعه</div>
                    <div className="text-xs text-gray-500">Development</div>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                  <div className="text-right w-full">
                    <div className="font-medium">محیط توسعه</div>
                    <div className="text-xs text-gray-500">Development</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="text-right w-full">
                    <div className="font-medium">محیط تولید</div>
                    <div className="text-xs text-gray-500">Production</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="text-right w-full">
                    <div className="font-medium">محیط آزمایشی</div>
                    <div className="text-xs text-gray-500">Testing</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Global Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* User Profile */}
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium">
                    علی کریمی
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-42">
                <DropdownMenuItem>پروفایل</DropdownMenuItem>
                <DropdownMenuItem>تنظیمات حساب کاربری</DropdownMenuItem>
                <DropdownMenuItem>مستندات API</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setLogoutOpen(true)}
                >
                  خروج از سیستم
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 right-0 bottom-0 z-40 w-64 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-l border-gray-200 dark:border-gray-800 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-right ${
                  isActive
                    ? "bg-gradient-to-l from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}
                />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer - Quick Stats */}
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            وضعیت سیستم
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">GPU فعال</span>
              <Badge
                variant="secondary"
                className="bg-green-500/10 text-green-700 dark:text-green-400"
              >
                8/12
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                نوت‌بوک‌های فعال
              </span>
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-700 dark:text-blue-400"
              >
                15
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${sidebarOpen ? "pr-0 lg:pr-64" : "pr-0"}`}
      >
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />
    </div>
  );
}
