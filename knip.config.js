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
  ignoreDependencies: ['wrangler'],
  workspaces: {
    './packages/prosekit': {
      entry: [
        'src/**/*-css.ts',
      ],
    },
    './registry': {
      entry: [
        'src/*/examples/*/index.ts',
        'src/*/examples/*/extension.ts',
        'src/*/shims-*.d.ts',
      ],
    },
    './website': {
      entry: [
        'src/stories/*.stories.ts',
        'src/styles/*.css',
      ],
      ignoreDependencies: [
        /@iconify-json\/.*/,
        'babel-plugin-react-compiler',
        'sharp',

        // Required by code blocks in documentation
        'prosemirror-highlight',
        'y-websocket',
      ],
    },
  },
  ignoreIssues: {},
  compilers: {
    css,
  },
}

export default config
