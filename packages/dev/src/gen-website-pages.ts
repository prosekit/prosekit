import { basename } from 'node:path'

import { pascalCase } from 'change-case'

import {
  readExampleMeta,
  type Example,
} from './example-meta.js'
import { vfs } from './virtual-file-system.js'

// NPM download stats on 2025 March
// react:          32,063,940
// vue:             6,427,934
// preact:          5,449,834
// @angular/core:   3,961,622
// lit:             2,306,263
// svelte:          2,147,140
// solid-js:          295,213
const frameworks = ['react', 'vue', 'preact', 'svelte', 'solid']

export async function genWebsitePages() {
  const meta = await readExampleMeta()

  await vfs.updateText(
    'website/src/examples/preact/loaders.gen.ts',
    genPreactLoaders(meta.examples),
  )
  await vfs.updateText(
    'website/src/examples/react/loaders.gen.ts',
    genReactLoaders(meta.examples),
  )
  await vfs.updateText(
    'website/src/examples/vue/loaders.gen.ts',
    genVueLoaders(meta.examples),
  )
  await vfs.updateText(
    'website/src/examples/solid/loaders.gen.ts',
    genSolidLoaders(meta.examples),
  )
  await vfs.updateText(
    'website/src/examples/svelte/loaders.gen.ts',
    genSvelteLoaders(meta.examples),
  )

  for (const framework of frameworks) {
    await vfs.updateText(
      `website/src/stories/${framework}.stories.ts`,
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
    // dprint-ignore
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
    // dprint-ignore
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
    // dprint-ignore
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
    // dprint-ignore
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
    // dprint-ignore
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
    // dprint-ignore
    ...examples
      .filter((example) => example.framework === framework)
      .map((example) => `export const ${pascalCase(example.story)} = { args: { story: '${example.story}' } }`),
  ]
  return lines.join('\n') + '\n'
}

const currentFilename = basename(import.meta.filename)
