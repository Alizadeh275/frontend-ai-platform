"use client";

import { useState } from "react";
import { SidebarProps, SidebarTab } from "./types";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarTabs } from "./SidebarTabs";
import { SidebarContent } from "./SidebarContent";

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("files");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["root"]),
  );

  if (!isOpen) return null;

  return (
    <div className="w-72 h-full flex flex-col bg-gradient-to-b from-gray-50/95 to-white border-l border-gray-100/80 shadow-lg">
      <SidebarHeader onClose={onClose} />

      <SidebarTabs activeTab={activeTab} onChange={setActiveTab} />

      <SidebarContent
        activeTab={activeTab}
        expandedFolders={expandedFolders}
        setExpandedFolders={setExpandedFolders}
      />
    </div>
  );
}
