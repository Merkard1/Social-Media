module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react-hooks/recommended",
    "airbnb",
    "plugin:i18next/recommended",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "i18next", "unused-imports"],
  rules: {
    "import/named": "error",
    "import/namespace": "error",
    "import/default": "error",
    "import/export": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        pathGroups: [
          {
            pattern: "@/1_app/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/2_pages/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/3_widgets/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/4_features/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/5_entities/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/6_shared/**",
            group: "internal",
            position: "after",
          },

        ],
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "no-undef": [0],
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-wrap-multilines": "off",
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    indent: [2, 2],

    camelcase: "warn",
    "react/jsx-no-useless-fragment": "off",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "react/no-array-index-key": "warn",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "i18next/no-literal-string": [
      "error",
      {
        markupOnly: true,
        ignoreAttribute: [
          "data-testid", "to", "justify", "direction",
          "align", "size", "wrap", "data-testid",
          "role", "as", "gap", "target", "border",
          "feature", "color", "variant", "name", "alt"],
      },
    ],
    "max-len": "off",
    quotes: [2, "double"],
    "react/jsx-max-props-per-line": ["error", { maximum: 4 }],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ["**/src/**/*.test.{ts,tsx}"],
      rules: {
        "i18next/no-literal-string": "off",
      },
    },
    {
      files: ["**/scripts/**/*.{ts,tsx,js}"],
      rules: {
        "wrap-iife": "off",
      },
    },
  ],
};
