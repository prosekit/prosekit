/**
 * @param {string} text
 * @returns {string}
 */
function css(text) {
  return [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n')
}

/**
 * @type {import('knip').KnipConfig}
 */
const config = {
  exclude: ['optionalPeerDependencies'],
  workspaces: {
    website: {
      entry: [
        'src/stories/*.stories.ts',
        'src/examples/**/*',
        'src/shared/**/*',
        'tests/helper.ts',
      ],
      ignoreUnresolved: [
        './my-prosemirror-highlight-parser',
      ],
      ignoreDependencies: [
        '@egoist/tailwindcss-icons',
        '@iconify-json/bxl',
        '@iconify-json/logos',
        '@iconify-json/lucide',
        '@iconify-json/tabler',
        '@prosekit/config-vitest',
        'babel-plugin-react-compiler',
        'sharp',
        'tailwindcss',
        'tw-animate-css',
      ],
    },
  },
  compilers: {
    css,
  },
}

export default config
