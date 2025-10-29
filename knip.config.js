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
  ignoreIssues: {
    // Remove this once this PR is merged: https://github.com/webpro-nl/knip/pull/1320
    'vitest.config.ts': ['unlisted'],
  },
  compilers: {
    css,
  },
}

export default config
