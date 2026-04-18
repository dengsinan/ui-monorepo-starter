/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      insertTypesEntry: true,
      tsconfigPath: resolve(rootDir, 'tsconfig.json'),
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**',
        '**/setupTests.ts',
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(rootDir, 'src/index.ts'),
      cssFileName: 'style',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'antd',
        /^antd\/.*$/,
        '@ant-design/cssinjs',
        'clsx',
        /^lodash-es(\/.*)?$/,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
