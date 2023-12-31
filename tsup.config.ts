import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src"],
    outDir: "dist/esm",
    format: ["esm"],
    clean: true,
    dts: true,
  },
  {
    entry: ["src"],
    outDir: "dist/cjs",
    format: ["cjs"],
    clean: true,
    dts: true,
  },
  {
    entry: ["src/index.ts"],
    outDir: "dist/iife",
    format: ["iife"],
    globalName: "expressionValidator",
    clean: true,
    treeshake: true,
    minify: "terser",
  },
]);
