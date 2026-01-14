// We need prettier to format html string templates in ts files.
// See https://github.com/dprint/dprint-plugin-typescript/issues/769

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
}

export default config
