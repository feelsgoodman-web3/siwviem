module.exports = {
  extends: [ "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended", "turbo", "prettier"],
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
