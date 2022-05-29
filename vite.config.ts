/// <reference types="vitest" />
// import { resolve } from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import pkg from "./package.json";

const path = require("path");
function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === "production") {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/" : "./",
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/head",
        "pinia",
        {
          "@/store": ["useStore"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      // "@": resolve(__dirname, "/src"),
      "@": _resolve("src"),
      "@assets": _resolve("src/assets"),
      "@comps": _resolve("src/components"),
      "@utils": _resolve("src/utils"),
      "@router": _resolve("src/router"),
      "@store": _resolve("src/store"),
    },
  },
  test: {
    include: ["tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        /**如果引入多个文件，可以使用
         * @import "@/assets/scss/globalVariable1.scss";
         * @import "@/assets/scss/globalVariable2.scss";'
         **/
        // additionalData: `@import "@assets/scss/main.scss";`,
        // additionalData: `
        // @import "@assets/scss/variable.scss";
        // @import "@assets/scss/media.scss";
        // @import "@assets/scss/basic.scss";
        // `,
      },
    },
  },
});
