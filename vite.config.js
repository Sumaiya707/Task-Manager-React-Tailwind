// Import Vite and React
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Import Tailwind CSS plugin
import tailwindcss from "@tailwindcss/vite";

// Configure Vite plugins
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
