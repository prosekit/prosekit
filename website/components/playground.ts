import { clsx } from 'clsx'
import { Sandpack, type SandpackPredefinedTemplate } from 'sandpack-vue3'
import type { PackageJson } from 'type-fest'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

import { shortcuts } from '../../config/unocss-shortcut.mjs'

import './sandpack-editor.css'

export interface PlaygroundProps {
  name: string
  files: Record<string, { hidden: boolean; code: string }>
  expand?: boolean
}

export const Playground = defineComponent<PlaygroundProps>(
  (props) => {
    const { isDark } = useData()

    const fileNames = Object.keys(props.files).map((fileName) =>
      fileName.replace(/^\//, ''),
    )

    return () =>
      h(
        'div',
        {
          class: clsx(
            'sandpack-editor',
            props.expand && 'sandpack-editor-expand',
          ),
        },
        [
          h(Sandpack, {
            theme: isDark.value ? 'dark' : 'light',
            template: getTemplateName(props.name),
            customSetup: {
              dependencies: {
                postcss: '8.4.28',
                tailwindcss: '3.3.3',
                prosekit: 'latest',
              },
            },
            files: {
              'tailwind.config.mjs': {
                hidden: true,
                code: `export default { content: ${JSON.stringify(
                  fileNames,
                )} }`,
              },
              'postcss.config.mjs': {
                hidden: true,
                code: 'export default { plugins: { tailwindcss: {} } }',
              },
              'styles.css': {
                hidden: true,
                code: '@tailwind base; @tailwind components; @tailwind utilities;',
              },
              ...patchFiles(props.files),
            },
            options: {
              showLineNumbers: true,
              editorHeight: '100%',
              showTabs: true,
            },
          }),
        ],
      )
  },
  {
    props: ['files', 'expand', 'name'],
  },
)

function patchFiles(files: Record<string, { hidden: boolean; code: string }>) {
  const patched = clone(files)

  if (patched['/package.json']) {
    patched['/package.json']['code'] = patchPackageJson(
      patched['/package.json']['code'],
    )
  }

  for (const file of Object.values(patched)) {
    file.code = patchCssClassNames(file.code)
  }

  return patched
}

function patchPackageJson(packageJsonString: string): string {
  const packageJson = JSON.parse(packageJsonString) as PackageJson
  return JSON.stringify(packageJson, null, 2) + '\n'
}

function patchCssClassNames(code: string): string {
  const shortcutNames = Object.keys(shortcuts).sort(
    (a, b) => b.length - a.length,
  )
  const regex = new RegExp(`\\b(${shortcutNames.join('|')})\\b`, 'g')
  return code.replace(regex, (match) => shortcuts[match])
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function getTemplateName(exampleName: string): SandpackPredefinedTemplate {
  const framework = exampleName.split('-')[0]

  if (framework === 'react') {
    return 'vite-react-ts'
  }

  if (framework === 'vue-') {
    return 'vite-vue-ts'
  }

  if (framework === 'svelte-') {
    return 'vite-svelte-ts'
  }

  if (framework === 'solid-') {
    return 'vite-solid'
  }

  if (framework === 'preact-') {
    // TODO: add a preact example
    return 'vite-react-ts'
  }

  if (framework === 'lit') {
    return 'vite-lit'
  }

  if (framework === 'vanilla') {
    return 'vite'
  }

  throw new Error(`Failed to find Sandpack template for ${exampleName}`)
}
