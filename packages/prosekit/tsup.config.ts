import { defineConfig } from 'tsup'

const entriesWithCss = {
  'basic/style': './src/basic/style.css',
  'basic/typography': './src/basic/typography.css',
  'extensions/commit/style': './src/extensions/commit/style.css',
  'extensions/gap-cursor/style': './src/extensions/gap-cursor/style.css',
  'extensions/list/style': './src/extensions/list/style.css',
  'extensions/loro/style': './src/extensions/loro/style.css',
  'extensions/placeholder/style': './src/extensions/placeholder/style.css',
  'extensions/search/style': './src/extensions/search/style.css',
  'extensions/table/style': './src/extensions/table/style.css',
  'extensions/virtual-selection/style': './src/extensions/virtual-selection/style.css',
  'extensions/yjs/style': './src/extensions/yjs/style.css',
  'pm/view/style/prosemirror': './src/pm/view/style/prosemirror.css',
}

export default defineConfig({
  format: 'esm',
  entry: entriesWithCss,
  sourcemap: false,
  clean: false,
  noExternal: [/\.css$/i],
  target: 'chrome80',
})
