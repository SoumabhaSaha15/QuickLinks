import path from 'path';
import { defineConfig } from 'vite';
import zip from 'vite-plugin-zip-pack';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import manifest from './manifest.config';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    crx({ manifest }),
    zip({ outDir: 'release', outFileName: `${pkg.name}-${pkg.version}.zip` }),
  ],

  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
      host: 'localhost',
    },
  },
})
