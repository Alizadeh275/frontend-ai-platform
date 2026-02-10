"use client";

import { Toaster } from "sonner";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4"
    >
      <Toaster position="top-center" richColors closeButton dir="rtl" />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden border border-gray-100">
        {children}
      </div>
    </div>
  );
}
