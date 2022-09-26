import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: "src/infra/http/index.ts",
    },
  },
});
