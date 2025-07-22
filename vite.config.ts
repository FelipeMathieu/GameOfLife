import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "reactGameOfLife",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react", "react-dom", "antd"],
    }),
  ],
  server: {
    port: 3001,
    allowedHosts: true,
    open: true,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});
