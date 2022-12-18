module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-underscore-dangle": ["off"],
    "no-sequences": ["off"],
  },
};