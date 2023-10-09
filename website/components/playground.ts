import { clsx } from 'clsx'
import dedent from 'dedent'
import { Sandpack, type SandpackPredefinedTemplate } from 'sandpack-vue3'
import type { PackageJson } from 'type-fest'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

import { shortcuts } from '../../config/unocss-shortcut.mjs'

import { preflightCssCode } from './preflight-css'
import './sandpack-editor.css'

export interface PlaygroundProps {
  name: string
  files: Record<string, { hidden: boolean; code: string }>
  expand?: boolean
}

export const Playground = defineComponent<PlaygroundProps>(
  (props) => {
    const { isDark } = useData()

    const files = clone(props.files)
    const fileNames = Object.keys(files).map((name) => name.replace(/^\//, ''))

    const dependencies = extractDependencies(files)
    patchFiles(files)

    const template = getTemplateName(props.name)

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
            template: template,
            customSetup: {
              dependencies: {
                ...dependencies,
                postcss: '8.4.28',
                tailwindcss: '3.3.3',
                '@egoist/tailwindcss-icons': '1.3.3',
                '@iconify-json/ci': '1.1.10',
                prosekit: 'latest',
              },
            },
            files: {
              'tailwind.config.mjs': {
                hidden: true,
                code: dedent`
                  import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"
                  
                  export default {
                    content: ${JSON.stringify(fileNames)},
                    plugins: [
                      iconsPlugin({
                        collections: getIconCollections(["ci"]),
                      }),
                    ],
                  }
                  `,
              },
              'postcss.config.mjs': {
                hidden: true,
                code: dedent`
                  export default {
                    plugins: { tailwindcss: {} }
                  }
                `,
              },
              'styles.css': {
                hidden: true,
                code: [
                  '@tailwind base;',
                  '@tailwind components;',
                  '@tailwind utilities;',
                  '',
                  preflightCssCode,
                  '',
                ].join('\n'),
              },
              ...files,
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

function extractDependencies(
  files: Record<string, { hidden: boolean; code: string }>,
): Record<string, string> {
  if (files['/package.json']) {
    const file = files['/package.json']
    delete files['/package.json']

    const packageJson = JSON.parse(file.code) as PackageJson

    if (
      JSON.stringify(Object.keys(packageJson)) !==
      JSON.stringify(['dependencies'])
    ) {
      throw new Error(`Unexpected package.json: ${file.code}`)
    }

    const dependencies = packageJson.dependencies as Record<string, string>

    for (const value of Object.values(dependencies)) {
      if (typeof value !== 'string') {
        throw new TypeError(`Unexpected dependencies: ${file.code}`)
      }
    }

    return dependencies
  }

  return {}
}

function patchFiles(files: Record<string, { hidden: boolean; code: string }>) {
  for (const file of Object.values(files)) {
    file.code = patchCssClassNames(file.code)
  }
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

  switch (framework) {
    case 'react':
      return 'vite-react-ts'
    case 'vue':
      return 'vite-vue-ts'
    case 'svelte':
      return 'vite-svelte-ts'
    case 'solid':
      return 'vite-solid'
    case 'preact':
      return 'vite-preact-ts'
    case 'lit':
      return 'vite-lit'
    case 'vanilla':
      return 'vite'
  }

  throw new Error(`Failed to find Sandpack template for ${exampleName}`)
}
