"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface MenuDropdownProps {
  label: string;
  items: string[];
  variant?: "default" | "modern";
}

export function MenuDropdown({
  label,
  items,
  variant = "default",
}: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "modern") {
    return (
      <div className="relative group">
        <button
          className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 flex items-center gap-1"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {label}
          <ChevronDown className="w-3 h-3" />
        </button>

        <div
          className={`absolute right-0 top-full mt-0 w-48 bg-white border border-gray-200/80 rounded-xl shadow-lg overflow-hidden ${isOpen ? "block" : "hidden"} group-hover:block z-40`}
        >
          {items.map((item, i) => (
            <button
              key={i}
              className="cursor-pointer w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-l hover:from-blue-50 hover:to-white border-b border-gray-100/50 last:border-0 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default variant (backwards compatible)
  return (
    <div className="relative">
      <button className="cursor-pointer px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
        {label}
      </button>
    </div>
  );
}
