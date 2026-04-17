import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    const uiRoot = resolve(process.cwd(), '../../packages/ui');
    const uiStyleEntry = resolve(uiRoot, 'src/styles/index.less').replace(/\\/g, '/');

    config.resolve ??= {};
    const existing = Array.isArray(config.resolve.alias) ? config.resolve.alias : [];
    config.resolve.alias = [
      ...existing,
      {
        find: '@dengsinan/ui/style.css',
        replacement: uiStyleEntry,
      },
      {
        find: '@dengsinan/ui',
        replacement: resolve(uiRoot, 'src/index.ts'),
      },
    ];

    return config;
  },
};

export default config;
