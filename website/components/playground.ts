import { clsx } from 'clsx'
import dedent from 'dedent'
import { SANDBOX_TEMPLATES, Sandpack } from 'sandpack-vue3'
import type { PackageJson } from 'type-fest'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

import { shortcuts } from '../../config/unocss-shortcut.mjs'

import { preflightCssCode } from './preflight-css'

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

    const template = replaceBuiltinApp(getTemplate(props.name))

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
            customSetup: {
              environment: 'node',
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
              ...Object.fromEntries(
                Object.entries(template.files).map(([name, file]) => [
                  name,
                  {
                    hidden: file.hidden ?? true,
                    code: file.code,
                  },
                ]),
              ),
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
                    plugins: {
                      'tailwindcss/nesting': {},
                      'tailwindcss': {}
                    }
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
              activeFile: template.main,
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

  return (
    code
      // Replace " with ', because some class names contain "
      .replace(
        new RegExp(`\"(${shortcutNames.join('|')})\"`, 'g'),
        (match) => `'` + shortcuts[match.slice(1, -1)] + `'`,
      )
      .replace(
        new RegExp(`\\b(${shortcutNames.join('|')})\\b`, 'g'),
        (match) => shortcuts[match],
      )
  )
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

type SandboxTemplate = {
  files: Record<string, { hidden?: boolean; code: string }>
  environment: string
  main: string
}

function getTemplate(exampleName: string): SandboxTemplate {
  const framework = exampleName.split('-')[0]

  switch (framework) {
    case 'react':
      return SANDBOX_TEMPLATES['vite-react-ts']
    case 'vue':
      return replaceSrc(SANDBOX_TEMPLATES['vite-vue-ts'])
    case 'svelte':
      return replaceSrc(SANDBOX_TEMPLATES['vite-svelte-ts'])
    case 'solid':
      return SANDBOX_TEMPLATES['vite-solid']
    case 'preact':
      return SANDBOX_TEMPLATES['vite-preact-ts']
    case 'lit':
      return SANDBOX_TEMPLATES['vite-lit']
    case 'vanilla':
      return SANDBOX_TEMPLATES['vite']
  }

  throw new Error(`Failed to find Sandpack template for ${exampleName}`)
}

function replaceSrc<T>(val: T): T {
  if (!val) return val

  if (typeof val === 'string') {
    return val.replaceAll('/src/', '/').replaceAll('src/', './') as T
  }

  if (Array.isArray(val)) {
    return val.map(replaceSrc) as T
  }

  if (typeof val === 'object') {
    const result = {} as Record<string, unknown>
    for (const [key, value] of Object.entries(val)) {
      result[replaceSrc(key)] = replaceSrc(value)
    }
    return result as T
  }

  return val
}

function replaceBuiltinApp(template: SandboxTemplate): SandboxTemplate {
  const files = template.files

  if (files['/App.vue']) {
    files['/App.vue'].hidden = true
    files['/App.vue'].code = dedent`
      <script setup lang="ts">
      import Editor from './editor.vue'
      </script>
      
      <template>
        <Editor />
      </template>
    `

    template.main = '/editor.vue'
  }

  if (files['/App.svelte']) {
    files['/App.svelte'].hidden = true
    files['/App.svelte'].code = dedent`
      <script lang="ts">
      import Editor from './editor.svelte'
      </script>
          
      <Editor />
    `

    template.main = '/editor.svelte'
  }

  if (files['/App.tsx']) {
    files['/App.tsx'].hidden = true
    files['/App.tsx'].code = dedent`
      import Editor from './editor'
      export default Editor
    `

    template.main = '/editor.tsx'
  }

  return template
}
