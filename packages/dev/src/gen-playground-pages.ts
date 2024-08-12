import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import pascalCase from 'just-pascal-case'

import { readExampleMeta, type Example } from './example-meta'
import { vfs } from './virtual-file-system'

export async function genPlaygroundPages() {
  const meta = await readExampleMeta()

  await vfs.updateText(
    'playground/examples/preact/loaders.gen.ts',
    genPreactLoaders(meta.examples),
  )
  await vfs.updateText(
    'playground/examples/react/loaders.gen.ts',
    genReactLoaders(meta.examples),
  )
  await vfs.updateText(
    'playground/examples/vue/loaders.gen.ts',
    genVueLoaders(meta.examples),
  )
  await vfs.updateText(
    'playground/examples/solid/loaders.gen.ts',
    genSolidLoaders(meta.examples),
  )
  await vfs.updateText(
    'playground/examples/svelte/loaders.gen.ts',
    genSvelteLoaders(meta.examples),
  )

  for (const framework of ['preact', 'react', 'vue', 'solid', 'svelte']) {
    await vfs.updateText(
      `playground/src/stories/${framework}.stories.ts`,
      genStories(framework, meta.examples),
    )
  }
}

function genPreactLoaders(examples: Example[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { lazy } from 'preact/compat'`,
    ``,
    `export const loaders = {`,
    // prettier-ignore
    ...examples
      .filter((example) => example.framework === 'preact')
      .map((example) => `  '${example.story}': lazy(() => import('./${example.story}/editor')),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genReactLoaders(examples: Example[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { lazy } from 'react'`,
    ``,
    `export const loaders = {`,
    // prettier-ignore
    ...examples
      .filter((example) => example.framework === 'react')
      .map((example) => `  '${example.story}': lazy(() => import('./${example.story}/editor')),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genVueLoaders(examples: Example[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { defineAsyncComponent } from 'vue'`,
    ``,
    `export const loaders = {`,
    // prettier-ignore
    ...examples
      .filter((example) => example.framework === 'vue')
      .map((example) => `  '${example.story}': defineAsyncComponent(() => import('./${example.story}/editor.vue')),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genSolidLoaders(examples: Example[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { lazy } from 'solid-js'`,
    ``,
    `export const loaders = {`,
    // prettier-ignore
    ...examples
      .filter((example) => example.framework === 'solid')
      .map((example) => `  '${example.story}': lazy(() => import('./${example.story}/editor')),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genSvelteLoaders(examples: Example[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    ``,
    `export const loaders = {`,
    // prettier-ignore
    ...examples
      .filter((example) => example.framework === 'svelte')
      .map((example) => `  '${example.story}': () => import('./${example.story}/editor.svelte'),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genStories(framework: string, examples: Example[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import component from './${framework}.astro'`,
    ``,
    `export default { component }`,
    ``,
    // prettier-ignore
    ...examples
      .filter((example) => example.framework === framework)
      .map((example) => `export const ${pascalCase(example.story)} = { args: { story: '${example.story}' } }`),
  ]
  return lines.join('\n') + '\n'
}

const currentFilename = basename(fileURLToPath(import.meta.url))
