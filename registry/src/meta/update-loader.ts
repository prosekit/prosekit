import { basename } from 'node:path'

import { vfs } from '@prosekit/dev'

import type { ItemAccumulator } from './types'

export function updateLoader(items: ItemAccumulator[]) {
  if (items.some((item) => item.framework === 'preact')) {
    vfs.updateText('registry/src/preact/loaders.gen.ts', genPreactLoaders(items))
  }

  if (items.some((item) => item.framework === 'react')) {
    vfs.updateText('registry/src/react/loaders.gen.ts', genReactLoaders(items))
  }

  if (items.some((item) => item.framework === 'vue')) {
    vfs.updateText('registry/src/vue/loaders.gen.ts', genVueLoaders(items))
  }

  if (items.some((item) => item.framework === 'solid')) {
    vfs.updateText('registry/src/solid/loaders.gen.ts', genSolidLoaders(items))
  }

  if (items.some((item) => item.framework === 'svelte')) {
    vfs.updateText('registry/src/svelte/loaders.gen.ts', genSvelteLoaders(items))
  }

  if (items.some((item) => item.framework === 'lit')) {
    vfs.updateText('registry/src/lit/loaders.gen.ts', genLitLoaders(items))
  }

  if (items.some((item) => item.framework === 'vanilla')) {
    vfs.updateText('registry/src/vanilla/loaders.gen.ts', genVanillaLoaders(items))
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
      .map((example) =>
        `  '${example.story}': lazy(() => import('./examples/${example.story}').then((m) => ({ default: m.ExampleEditor }))),`
      ),
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
      .map((example) =>
        `  '${example.story}': lazy(() => import('./examples/${example.story}').then((m) => ({ default: m.ExampleEditor }))),`
      ),
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
      .map((example) =>
        `  '${example.story}': defineAsyncComponent(() => import('./examples/${example.story}').then((m) => m.ExampleEditor)),`
      ),
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
      .map((example) =>
        `  '${example.story}': lazy(() => import('./examples/${example.story}').then((m) => ({ default: m.ExampleEditor }))),`
      ),
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
      .map((example) => `  '${example.story}': () => import('./examples/${example.story}').then((m) => ({ default: m.ExampleEditor })),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genLitLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'lit')
      .map((example) => `  '${example.story}': () => import('./examples/${example.story}').then((m) => m.registerLitEditor()),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

function genVanillaLoaders(items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    ``,
    `export const loaders = {`,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === 'vanilla')
      .map((example) => `  '${example.story}': () => import('./examples/${example.story}').then((m) => m.setupVanillaEditor()),`),
    '}',
  ]
  return lines.join('\n') + '\n'
}

const currentFilename = basename(import.meta.filename)
