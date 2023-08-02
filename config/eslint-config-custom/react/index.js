// @ts-check
/** @type {import('eslint').ESLint.ConfigData} */
const eslintConfig = {
  extends: ["../base", "plugin:react/recommended"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};

module.exports = eslintConfig;
