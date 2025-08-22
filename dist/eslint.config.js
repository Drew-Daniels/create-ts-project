import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
        linterOptions: {
            reportUnusedDisableDirectives: 'off',
        },
    },
    // @ts-expect-error https://github.com/typescript-eslint/typescript-eslint/issues/10899
    tseslint.configs.recommended,
    cspellESLintPluginRecommended,
    eslintConfigPrettier,
    globalIgnores(['./dist', './bin']),
]);
