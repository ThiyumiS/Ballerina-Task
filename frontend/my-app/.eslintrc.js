thiyumi / Desktop / my / notBackup / Ballerina -
  Task / frontend / my -
  app / eslintrc.js;

// module.exports = {
//   extends: ["react-app", "plugin:cypress/recommended"],
//   plugins: ["cypress"],
//   env: {
//     "cypress/globals": true,
//   },
// };

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
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
