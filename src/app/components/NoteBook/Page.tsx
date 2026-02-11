"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { Toaster } from "sonner";

import { TopBar } from "./TopBarV2/TopBar";
import { Sidebar } from "./SideBarV2/Sidebar";
import { SidebarToggle } from "./SideBarV2/SidebarToggle";

import { CellList } from "./Cells/CellList";
import { NotebookLayout } from "./NotebookLayout";

import { useCells } from "./hooks/useCells";

export default function NoteBookPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const cellsApi = useCells();
  const { id } = useParams();

  console.log("Notebook server opened:", id);

  return (
    <NotebookLayout>
      <Toaster position="top-center" richColors closeButton dir="rtl" />

      <TopBar
        projectName="پروژه_تحلیل_داده.ipynb"
        ramUsage="2.1 / 12.7 GB"
        diskUsage="43.2 / 107 GB"
        runtimeStatus="connected"
        onAddCodeCell={() => cellsApi.addCell("code")}
        onAddTextCell={() => cellsApi.addCell("text")}
      />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Notebook area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-5xl mx-auto py-6 px-4">
            <CellList {...cellsApi} />

            {/* Footer info (اگر قبلاً داشتی) */}
            <div className="mt-12 pb-8 text-center text-sm text-gray-500">
              <p>ابزار توسعه تعاملی - نسخه 1.0.0</p>
              <p className="mt-1">برای شروع، سلول کد یا متن جدیدی اضافه کنید</p>
            </div>
          </div>
        </div>

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <SidebarToggle open={isSidebarOpen} onToggle={setIsSidebarOpen} />
      {/* <ExecutionIndicator cells={cellsApi.cells} /> */}
    </NotebookLayout>
  );
}
