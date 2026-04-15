import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBaseConfig } from './eslint.shared.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default createBaseConfig({ tsconfigRootDir: dirname });
