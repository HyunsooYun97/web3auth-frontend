import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    nodePolyfills({
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      // buffer polyfill
      stream: 'vite-plugin-node-polyfills/polyfills/stream',
      buffer: 'vite-plugin-node-polyfills/polyfills/buffer',
      util: 'vite-plugin-node-polyfills/polyfills/util',
      process: 'vite-plugin-node-polyfills/polyfills/process',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
