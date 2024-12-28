module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'perfectionist'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'perfectionist/sort-decorators': [
      'error',
      {
        type: 'natural', // Sorting method: 'alphabetical', 'natural', 'line-length', or 'custom'
        order: 'asc', // Order: 'asc' for ascending, 'desc' for descending
        ignoreCase: true, // Ignore case when sorting
        sortOnClasses: true, // Enable sorting for class decorators
        sortOnMethods: true, // Enable sorting for method decorators
        sortOnProperties: true, // Enable sorting for property decorators
        sortOnAccessors: true, // Enable sorting for accessor decorators
        sortOnParameters: true, // Enable sorting for parameter decorators
      },
    ],
  },
};
