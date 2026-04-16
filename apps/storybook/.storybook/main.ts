import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';

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
    const uiStyleEntry = resolve(process.cwd(), '../../packages/ui/src/styles/index.less').replace(
      /\\/g,
      '/',
    );

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
        replacement: resolve(process.cwd(), '../../packages/ui/src/index.ts'),
      },
    ];

    const uiStyleFirst: Plugin = {
      name: 'ui-style-first',
      enforce: 'pre',
      transform(code, id) {
        if (!/\.storybook[\\/]preview\.[tj]sx?$/.test(id)) return;
        return `import '${uiStyleEntry}';\n${code}`;
      },
    };
    (config.plugins ??= []).push(uiStyleFirst);

    return config;
  },
};

export default config;
