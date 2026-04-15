import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const defaultIgnores = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/coverage/**',
  '**/storybook-static/**',
  '**/.turbo/**',
  '**/.changeset/*.md',
  '**/*.d.ts',
];

export function createBaseConfig({ ignores = [], tsconfigRootDir } = {}) {
  return [
    {
      ignores: [...defaultIgnores, ...ignores],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
      files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.node,
        },
        parserOptions: {
          tsconfigRootDir,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        react,
        'react-hooks': reactHooks,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...react.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    prettier,
  ];
}
