import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const googleConfigs = compat.extends('google').map(config => {
  if (config.rules) {
    delete config.rules['valid-jsdoc'];
    delete config.rules['require-jsdoc'];
  }
  return {
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs']
  };
});

const prettierConfigs = compat.extends('plugin:prettier/recommended').map(config => ({
  ...config,
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs']
}));

export default [
  ...googleConfigs,
  ...prettierConfigs,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module'
    },

    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false
        }
      ],

      'prettier/prettier': 'error'
    }
  }
];
