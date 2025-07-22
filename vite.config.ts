import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import dotenv from "dotenv";

dotenv.config();

const ENV = process.env.VITE_ENV;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      dev: ENV === "DEV",
      name: "reactGameOfLife",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        antd: {
          singleton: true,
        },
      },
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
