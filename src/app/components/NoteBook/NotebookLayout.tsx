"use client";

export function NotebookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-white" dir="rtl">
      {children}
    </div>
  );
}
