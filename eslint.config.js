import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: true,
        document: true,
        fetch: true,
        setTimeout: true,
        setInterval: true,
        clearInterval: true,
        localStorage: true,
        navigator: true,
        Blob: true,
        URL: true,
        HTMLElement: true,
        HTMLAudioElement: true,
        HTMLInputElement: true,
        HTMLSelectElement: true,
        HTMLVideoElement: true,
        WebSocket: true,
        console: true,
        alert: true,
        process: true,
        NodeJS: true,
        AudioContext: true,
        btoa: true,
        RTCDataChannel: true,
        RTCPeerConnection: true,
        JSX: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  // Configuração específica para arquivos de teste
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/__tests__/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Globais do Jest
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        // Globais do DOM e ambiente
        window: true,
        document: true,
        fetch: true,
        setTimeout: true,
        setInterval: true,
        clearInterval: true,
        localStorage: true,
        navigator: true,
        Blob: true,
        URL: true,
        HTMLElement: true,
        console: true,
        process: true,
        NodeJS: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
