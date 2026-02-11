import { X } from "lucide-react";

export function SidebarHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100/80">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
        <h3 className="text-sm font-semibold text-gray-800">پنل کناری</h3>
      </div>

      <button
        onClick={onClose}
        className="p-1.5 rounded-lg hover:bg-gray-100/80 transition-colors"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
