import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                Buffer: 'readonly',
                crypto: 'readonly',
                process: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'no-unused-vars': 'error',
            'no-undef': ['error', { typeof: true }],
            'prefer-const': 'error',
            ...eslint.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
        },
        settings: {
            node: true,
        },
        ignores: ['dist', 'node_modules'],
    },
];
