import { FolderOpen, FileText, Code, Database } from "lucide-react";
import { SidebarTab } from "./types";

const tabs = [
  {
    id: "files",
    icon: FolderOpen,
    label: "فایل‌ها",
    color: "from-purple-500 to-purple-400",
  },
  {
    id: "toc",
    icon: FileText,
    label: "فهرست",
    color: "from-emerald-500 to-green-400",
  },
  {
    id: "snippets",
    icon: Code,
    label: "کدها",
    color: "from-violet-500 to-purple-400",
  },
  {
    id: "variables",
    icon: Database,
    label: "متغیرها",
    color: "from-amber-500 to-orange-400",
  },
] as const;

export function SidebarTabs({
  activeTab,
  onChange,
}: {
  activeTab: SidebarTab;
  onChange: (tab: SidebarTab) => void;
}) {
  return (
    <div className="flex border-b border-gray-100/80 bg-gradient-to-r from-gray-50/50 to-white/30">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 px-3 py-3 flex flex-col items-center gap-1 transition-all relative ${
              isActive
                ? "text-gray-800"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white`
                  : "bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>

            <span className="text-xs font-medium">{tab.label}</span>

            {isActive && (
              <div
                className={`absolute bottom-0 w-12 h-0.5 rounded-t-full bg-gradient-to-r ${tab.color}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
