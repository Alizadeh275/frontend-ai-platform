import { createRoot } from "react-dom/client";
import { AuthProvider } from "./app/stores/AuthContext";
import { AppRouter } from "./app/router";
import "./styles/index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing");
}

createRoot(container).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>,
);
