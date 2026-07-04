import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    port: 5173
  },

  resolve: {
    alias: {
      "@api": "/api-service/src",
      "@ui": "/ui-service/app"
    }
  }
});