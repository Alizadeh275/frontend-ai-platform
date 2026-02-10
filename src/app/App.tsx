import React, { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { MainDashboard } from "./components/MainDashboard";
import { NotebookServers } from "./components/NotebookServers";
import { GPUMonitoring } from "./components/GPUMonitoring";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    | "dashboard"
    | "notebooks"
    | "pipelines"
    | "datasets"
    | "models"
    | "gpu"
    | "settings"
  >("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("dir", "rtl");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <MainDashboard />;
      case "notebooks":
        return <NotebookServers />;
      case "gpu":
        return <GPUMonitoring />;
      case "pipelines":
        return (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            صفحه پایپ‌لاین‌ها در حال توسعه است
          </div>
        );
      case "datasets":
        return (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            صفحه دیتاست‌ها در حال توسعه است
          </div>
        );
      case "models":
        return (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            صفحه مدل‌ها در حال توسعه است
          </div>
        );
      case "settings":
        return (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            صفحه تنظیمات در حال توسعه است
          </div>
        );
      default:
        return <MainDashboard />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      {renderPage()}
    </Layout>
  );
}
