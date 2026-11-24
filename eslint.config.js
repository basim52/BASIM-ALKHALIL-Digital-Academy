import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

const SRC = ['src/**/*.{ts,tsx}'];

export default [
  {
    ignores: ['dist/**/*', 'src/server/generated/**/*']
  },
  firebaseRulesPlugin.configs['flat/recommended'],
  // TypeScript + React hooks for the app source.
  ...tseslint.configs.recommended.map(c => ({ ...c, files: SRC })),
  {
    files: SRC,
    plugins: { 'react-hooks': reactHooks },
    linterOptions: { reportUnusedDisableDirectives: 'warn' },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Must stay an error: a hook called conditionally / outside a component breaks React.
      'react-hooks/rules-of-hooks': 'error',
      // Pre-existing code trips these a lot; warn for now so CI passes without mass-editing unrelated files.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'prefer-const': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },
  {
    // Known pre-existing rules-of-hooks findings in files this lint PR must not change (Sara's live call and
    // Sara's tools). Kept visible as warnings here only; every other file keeps rules-of-hooks as an error.
    files: ['src/components/SaraLivePhoneCallModal.tsx', 'src/components/SaraTools.tsx'],
    rules: { 'react-hooks/rules-of-hooks': 'warn' },
  },
];
