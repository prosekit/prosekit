import { build, propFallback } from '@aria-ui/cli'

const components = [
  'tooltip',
  'popover',
  'menu',
  'resizable',
  'drop-indicator',
  'inline-popover',
  'table-handle',
  'block-handle',
  'autocomplete',
]
const frameworks = ['react', 'preact', 'solid', 'vue', 'svelte']
const editorFallback = propFallback({
  prop: 'editor',
  match: ({ component }) => component.props.some((prop) => prop.name === 'editor'),
  frameworks: {
    react: {
      importSource: '../../contexts/editor-context.ts',
      importName: 'useEditorContext',
    },
    preact: {
      importSource: '../../contexts/editor-context.ts',
      importName: 'useEditorContext',
    },
    solid: {
      importSource: '../../contexts/editor-context.ts',
      importName: 'useEditorContext',
    },
    vue: {
      importSource: '../../injection/editor-context.ts',
      importName: 'useEditorContext',
    },
    svelte: {
      importSource: '../../contexts/editor-context.ts',
      importName: 'useEditorContext',
    },
  },
})

for (const component of components) {
  for (const framework of frameworks) {
    await build({
      tsconfig: './tsconfig.build.json',
      entry: `./src/components/${component}/index.ts`,
      output: `../${framework}/src/components/${component}`,
      importSource: `@prosekit/web/${component}`,
      prefix: 'prosekit',
      framework,
      wrapperExtensions: [editorFallback],
    })
  }
}
