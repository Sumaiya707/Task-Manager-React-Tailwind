// Import React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import CSS and App component
import "./index.css";
import App from "./App.jsx";

// Display App inside the root element
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
