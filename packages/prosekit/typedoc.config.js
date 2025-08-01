// @ts-check

import packageJson from './package.json' with { type: 'json' }

/**
 * @type {string[]}
 */
const entryPoints = Object.values(packageJson.exports)
  // Inject documentation for some css files
  .map((entryPoint) => entryPoint.replace(/^\.\/src\/(.*)\.css$/, './src/$1-css.ts'))
  // Filter out CSS files
  .filter((entryPoint) => !entryPoint.endsWith('.css'))
  .filter((entryPoint) => !!entryPoint)
  // Remove lit modules because they are just simple re-exports from the web modules
  .filter((entryPoint) => !entryPoint.startsWith('./src/lit'))
  // Remove the empty main entry point
  .filter((entryPoint) => entryPoint !== './src/index.ts')
  .sort()

/**
 * @type {import("typedoc").TypeDocOptions}
 * https://typedoc.org/options/
 */
const typedocConfig = {
  entryPoints,
  tsconfig: './tsconfig.build.json',
  out: '.temp/typedoc',
  router: 'module',
  plugin: [
    'typedoc-plugin-markdown',
    '@prosekit/typedoc-plugin',
    'typedoc-plugin-frontmatter',
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-external-package-links',
  ],
  theme: 'my-markdown-theme',
  githubPages: false,
  disableSources: true,

  // Ensure that the order of enum members is preserved
  sort: ['source-order'],
  externalSymbolLinkMappings: {
    'lit': {
      LitElement: 'https://lit.dev/docs/api/LitElement/#LitElement',
    },
    '@floating-ui/dom': {
      VirtualElement: 'https://floating-ui.com/docs/virtual-elements',
      ComputePositionConfig: 'https://floating-ui.com/docs/computeposition#options',
      AutoUpdateOptions: 'https://floating-ui.com/docs/autoUpdate#options',
    },
  },
  readme: 'none',
  exclude: [
    '**/node_modules/prosemirror-inputrules/**',
    '**/node_modules/prosemirror-flat-list/**',
    '**/node_modules/typescript/**',
    '**/node_modules/loro-prosemirror/**',
    '**/node_modules/y-prosemirror/**',
  ],
  excludeExternals: false,
  excludeInternal: true,
  excludePrivate: true,
  validation: {
    notDocumented: true,
  },
  requiredToBeDocumented: [
    'Enum',
    // "EnumMember",
    // "Variable"
    // "Function",
    // "Class",
    // "Interface",
    // "Property",
    // "Method",
    // "Accessor",
    // "TypeAlias"
  ],
  visibilityFilters: {
    'protected': false,
    'private': false,
    'inherited': false,
    'external': false,
    '@alpha': false,
    '@beta': false,
  },
  treatWarningsAsErrors: true,
  cleanOutputDir: true,
}

/**
 * @type {import('typedoc-plugin-markdown').PluginOptions}
 * https://typedoc-plugin-markdown.org/docs/options
 */
const typedocPluginMarkdownConfig = {
  hidePageHeader: true,
  hideBreadcrumbs: true,
  hidePageTitle: true,
  useCustomAnchors: true,
  useCodeBlocks: false,
  expandParameters: true,
  parametersFormat: 'htmlTable',
  enumMembersFormat: 'htmlTable',
}

/**
 * @type {unknown}
 */
const config = {
  ...typedocConfig,
  ...typedocPluginMarkdownConfig,
}

export default config
