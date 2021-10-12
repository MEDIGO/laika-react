const path = require('path')

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['react-hooks', '@typescript-eslint', 'import'],
  rules: {
    'dot-notation': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 0,
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['input'],
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-script-url': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off', // https://github.com/eslint/eslint/issues/12822#issuecomment-634950696
    'no-use-before-define': 'off',
    'react/destructuring-assignment': 'off',
    'prefer-destructuring': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-props-no-multi-spaces': 'off',
    'space-before-function-paren': [
      'error',
      { named: 'never', anonymous: 'never' },
    ],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    camelcase: 'off',
    'react/jsx-props-no-spreading': 'off', // we want {...props} D:
    'react/sort-comp': 'off', // this would order functions by name instead of grouping them by relevance
    'import/no-cycle': 'warn',
    'import/no-default-export': 'warn',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*', '..'],
            message: 'Use absolute paths',
          },
        ],
      },
    ],
  },
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          alias: {
            app: path.resolve(__dirname, 'src'),
          },
          resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
  },
  overrides: [
    {
      files: ['*.test.*', 'cypress/**/*.ts'],
      plugins: ['cypress'],
      // extends: ['plugin:cypress/recommended'],
    },
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    __webpack_hash__: 'readonly',
    JSX: true,
  },
}
