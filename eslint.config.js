import js from '@eslint/js';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**'] },
  js.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.mjs', 'astro.config.mjs'],
    languageOptions: {
      globals: { console: 'readonly', process: 'readonly', URL: 'readonly' },
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      'no-undef': 'off',
    },
  },
];
