module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 0,
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': [ 2, {
      'labelComponents': ['label'],
      'labelAttributes': ['htmlFor'],
      'controlComponents': ['input']
    }],
     'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link' ],
      'specialLink': [ 'hrefLeft', 'hrefRight' ],
      'aspects': [ 'noHref' ]
    }],
    'no-script-url': 'off',
    'no-underscore-dangle': 'off',
    'react/destructuring-assignment': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'space-before-function-paren': ['error', { 'named': 'never', 'anonymous': 'never' }],
    semi: ['error', 'never', { 'beforeStatementContinuationChars': 'always'}],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
