import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import { AuthPage } from "./components/Auth/Page";
import { useAuth } from "./stores/AuthContext";
import NoteBookPage from "./components/NoteBook/Page"; // adjust path if needed
import { JSX } from "react";

// 🔐 Protected route wrapper (clean & scalable)
function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { user } = useAuth();

  // if not logged in → go login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if logged in → show requested page
  return element;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page (public) */}
        <Route path="/login" element={<AuthPage />} />

        {/* Main dashboard */}
        <Route path="/" element={<ProtectedRoute element={<App />} />} />

        {/* Notebook page (opens in new tab) */}
        <Route
          path="/notebook/:id"
          element={<ProtectedRoute element={<NoteBookPage />} />}
        />

        {/* fallback → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
