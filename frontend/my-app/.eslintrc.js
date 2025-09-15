module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    "cypress/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "react-app",
    "plugin:cypress/recommended"
  ],
  plugins: ["react","cypress"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  }, 
  rules: {
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/prop-types": "off", // If not using prop-types
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
