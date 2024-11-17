import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  daStyle,
  {
    rules: {
      "import/no-extraneous-dependencies": 0,
      "no-console": 0,
      "no-alert": 0,
      "no-underscore-dangle": 0,
      "no-restricted-globals": 0,

      'semi': ['error', 'always'],
      'no-prototype-builtins': 0,
      'linebreak-style': 0,
      'space-infix-ops': ['error'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],
    },
  },
];