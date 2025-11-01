import { basename } from 'node:path'

import { vfs } from '@prosekit/dev'
import { pascalCase } from 'change-case'

import {
  FRAMEWORKS,
  type ItemAccumulator,
} from './types'

export async function updateWebsitePages(items: ItemAccumulator[]) {
  if (items.some((item) => item.framework === 'preact')) {
    await vfs.updateText(
      'website/src/examples/preact/loaders.gen.ts',
      genPreactLoaders(items),
    )
  }

  if (items.some((item) => item.framework === 'react')) {
    await vfs.updateText(
      'website/src/examples/react/loaders.gen.ts',
      genReactLoaders(items),
    )
  }

  if (items.some((item) => item.framework === 'vue')) {
    await vfs.updateText(
      'website/src/examples/vue/loaders.gen.ts',
      genVueLoaders(items),
    )
  }

  if (items.some((item) => item.framework === 'solid')) {
    await vfs.updateText(
      'website/src/examples/solid/loaders.gen.ts',
      genSolidLoaders(items),
    )
  }

  if (items.some((item) => item.framework === 'svelte')) {
    await vfs.updateText(
      'website/src/examples/svelte/loaders.gen.ts',
      genSvelteLoaders(items),
    )
  }

  for (const framework of FRAMEWORKS) {
    if (items.some((item) => item.framework === framework)) {
      await vfs.updateText(
        `website/src/stories/${framework}.stories.ts`,
        genStories(framework, items),
      )
    } else {
      console.warn(`[${currentFilename}] No items found for framework ${framework}`)
    }
  }
}

function genPreactLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { lazy } from 'preact/compat'`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'preact')
      .map((example) => `  '${example.story}': lazy(() => import('prosekit-registry/${example.framework}/examples/${example.story}').then((m) => ({ default: m.ExampleEditor }))),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genReactLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { lazy } from 'react'`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'react')
      .map((example) => `  '${example.story}': lazy(() => import('prosekit-registry/${example.framework}/examples/${example.story}').then((m) => ({ default: m.ExampleEditor }))),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genVueLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { defineAsyncComponent } from 'vue'`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'vue')
      .map((example) => `  '${example.story}': defineAsyncComponent(() => import('prosekit-registry/${example.framework}/examples/${example.story}').then((m) => m.ExampleEditor)),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genSolidLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import { lazy } from 'solid-js'`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'solid')
      .map((example) => `  '${example.story}': lazy(() => import('prosekit-registry/${example.framework}/examples/${example.story}').then((m) => ({ default: m.ExampleEditor }))),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genSvelteLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'svelte')
      .map((example) => `  '${example.story}': () => import('prosekit-registry/${example.framework}/examples/${example.story}').then((m) => ({ default: m.ExampleEditor })),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genStories(framework: string, items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import component from './${framework}.astro'`,
    ``,
    `export default { component }`,
    ``,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === framework)
      .map((example) => `export const ${pascalCase(example.story)} = { args: { story: '${example.story}' } }`),
  ]
  return lines.join('\n') + '\n'
}

const currentFilename = basename(import.meta.filename)
