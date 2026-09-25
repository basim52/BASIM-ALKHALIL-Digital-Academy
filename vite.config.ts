import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // React and DOM
              if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
                return 'vendor-react';
              }
              // Firebase ecosystem
              if (id.includes('/firebase/') || id.includes('/@firebase/')) {
                return 'vendor-firebase';
              }
              // Charts (Recharts & D3)
              if (id.includes('/recharts/') || id.includes('/d3-') || id.includes('/victory-')) {
                return 'vendor-charts';
              }
              // Markdown renderer and dependencies
              if (
                id.includes('/react-markdown/') ||
                id.includes('/remark') ||
                id.includes('/rehype') ||
                id.includes('/micromark') ||
                id.includes('/mdast') ||
                id.includes('/unist') ||
                id.includes('/unified') ||
                id.includes('/vfile')
              ) {
                return 'vendor-markdown';
              }
              // Motion libraries
              if (id.includes('/motion/') || id.includes('/framer-motion/')) {
                return 'vendor-motion';
              }
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
