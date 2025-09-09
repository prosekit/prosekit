// @ts-check

/**
 * @param {string} text
 * @returns {string}
 */
function css(text) {
  const output = [...text.matchAll(/@(?:import|plugin)\s+([^;]+)/g)]
    .map(match => `import ${match[1]}`)
    .join('\n')
  return output
}

/**
 * @type {import('knip').KnipConfig}
 */
const config = {
  exclude: ['optionalPeerDependencies', 'binaries'],
  workspaces: {
    './packages/prosekit': {
      entry: [
        'src/**/*-css.ts',
      ],
    },
    './website': {
      entry: [
        'src/stories/*.stories.ts',
        'src/examples/**/*',
        'src/shared/**/*',
        'tests/helper.ts',
        'src/styles/*.css',
      ],
      ignoreUnresolved: [
        './my-prosemirror-highlight-parser',
      ],
      ignoreDependencies: [
        /@iconify-json\/.*/,
        'babel-plugin-react-compiler',
        'sharp',
      ],
    },
  },
  compilers: {
    css,
  },
}

export default config
