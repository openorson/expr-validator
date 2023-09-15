import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "exprValidator",
      fileName: "expr-validator",
    },
    // rollupOptions: {
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue',
    //     },
    //   },
    // },
  },
});
