/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  bracketSameLine: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"]
};

module.exports = config;
