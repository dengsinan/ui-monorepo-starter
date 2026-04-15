import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import { createBaseConfig } from '../../eslint.shared.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...createBaseConfig({ tsconfigRootDir: dirname }),
  ...storybook.configs['flat/recommended'],
]);
