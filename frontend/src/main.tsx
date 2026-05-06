import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (err) {
  // expose render error for debugging
  try {
    // @ts-ignore
    window.__lastRenderError = err && err.stack ? err.stack : String(err);
    // also log to console so vite overlay may show it
    // @ts-ignore
    console.error("App render error (captured):", err);
  } catch (e) {}
  throw err;
}
