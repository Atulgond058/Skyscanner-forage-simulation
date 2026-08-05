import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import { esbuildFlowPlugin } from '@bunchtogether/vite-plugin-flow'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const flowRemoveTypes = require('flow-remove-types')

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildFlowPlugin(
          /\.(flow|jsx?)$/,
          (path) => {
            const normalizedPath = path.replace(/\\/g, '/');
            if (normalizedPath.includes('node_modules/bpk-') && normalizedPath.endsWith('.js')) {
              return 'jsx';
            }
            return /\.jsx$/.test(path) ? 'jsx' : 'js';
          },
          { all: true }
        )
      ]
    }
  },
  plugins: [
    {
      name: 'transform-bpk-flow-and-jsx',
      async transform(code, id) {
        const normalizedId = id.replace(/\\/g, '/');
        if (!normalizedId.includes('node_modules/bpk-') || !normalizedId.split('?')[0].endsWith('.js')) return null;

        // Step 1: Strip Flow types
        const stripped = flowRemoveTypes(code, { all: true }).toString();

        // Step 2: Compile JSX
        return transformWithEsbuild(stripped, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react()
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    server: {
      deps: {
        inline: ['@csstools/css-calc', '@asamuzakjp/css-color']
      }
    }
  }
})
