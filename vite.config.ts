import { resolve } from "path"
import legacy from "@vitejs/plugin-legacy"
import ScriptSetup from "unplugin-vue2-script-setup/vite"
import { defineConfig } from "vite"
import { createVuePlugin } from "vite-plugin-vue2"
import tsconfigPaths from "vite-tsconfig-paths"
import copy from "rollup-plugin-copy"
import viteCompression from "vite-plugin-compression"
import ViteComponents from "vite-plugin-components"
import viteSvgIcons from "vite-plugin-svg-icons"
import pkg from "./package.json"
import moment from "moment"

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format("YYYY-MM-DD HH:mm:ss"),
}

export default defineConfig({
  base: "./",

  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },

  root: process.cwd(),

  optimizeDeps: {
    // exclude: ["underscore"],
  },

  resolve: {
    extensions: [".js", ".vue"],
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "@API",
        replacement: resolve(__dirname, "src/api"),
      },
      {
        find: "@ASS",
        replacement: resolve(__dirname, "src/assets"),
      },
      {
        find: "@COM",
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: "@VIE",
        replacement: resolve(__dirname, "src/views"),
      },
    ],
  },

  plugins: [
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    ScriptSetup(),
    createVuePlugin(),
    tsconfigPaths(),
    viteSvgIcons({
      iconDirs: [resolve(process.cwd(), "src/assets/icons/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    copy({
      targets: [{ src: "static/*", dest: "dist/static" }],
      hook: "writeBundle",
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    ViteComponents(),
  ],

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "@ASS/css/theme.less";`,
        },
      },
      // 添加 scss 配置解决 Sass 警告
      scss: {
        silenceDeprecations: ["legacy-js-api"],
        api: "modern-compiler",
      },
      // 如果你也使用 sass，添加这个
      sass: {
        silenceDeprecations: ["legacy-js-api"],
        api: "modern-compiler",
      },
    },
  },

  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
    chunkSizeWarningLimit: 800,
    target: "modules",
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    commonjsOptions: {},
    manifest: false,
    minify: "terser",
    write: true,
    emptyOutDir: true,
    brotliSize: true,
  },

  server: {
    open: false,
    port: 8090,
    host: "0.0.0.0",
    proxy: {
      "/serverPC/": {
        target: "http://idp.ctgne.com/serverPC/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/serverPC/, ""),
      },
      "/sxxm_pro/business": {
        target: "http://localhost:9001/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/sxxm_pro\/business/, ""),
      },
      "/system": {
        target: "http://127.0.0.1:8002",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/system/, ""),
      },
      "/thirdApi": {
        target: "http://144.7.110.122:8010/thirdApi/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/thirdApi/, ""),
      },
      "/testApi": {
        target: "http://144.7.110.122:9000/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/testApi/, ""),
      },
      "/videoApi": {
        target: "http://144.7.110.122:8010/videoApi/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/videoApi/, ""),
      },
      "/baiduApi": {
        target: "https://api.map.baidu.com",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/baiduApi/, ""),
      },
      "/api": {
        target: process.env.VITE_API_TARGET || 'http://182.44.4.242:18080',
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    hmr: {
      overlay: true,
    },
  },
})
