import { type Package } from '@manypkg/get-packages'

import { kebabToPascal } from './kebab-to-pascal'
import { vfs } from './virtual-file-system'

export async function genComponents() {
  const litPackage = await vfs.getPackageByName('@prosekit/lit')
  const reactPackage = await vfs.getPackageByName('@prosekit/react')
  const vuePackage = await vfs.getPackageByName('@prosekit/vue')
  const sveltePackage = await vfs.getPackageByName('@prosekit/svelte')
  const solidPackage = await vfs.getPackageByName('@prosekit/solid')
  const preactPackage = await vfs.getPackageByName('@prosekit/preact')

  await vfs.cleanGeneratedFilesInPackage(reactPackage)
  await vfs.cleanGeneratedFilesInPackage(vuePackage)
  await vfs.cleanGeneratedFilesInPackage(sveltePackage)
  await vfs.cleanGeneratedFilesInPackage(solidPackage)
  await vfs.cleanGeneratedFilesInPackage(preactPackage)

  const componentNames = readLitComponents(litPackage)
  await writeReactComponents(reactPackage, componentNames)
  await writeVueComponents(vuePackage, componentNames)
  await writeSvelteComponents(sveltePackage, componentNames)
  await writeSolidComponents(solidPackage, componentNames)
  await writePreactComponents(preactPackage, componentNames)
}

async function writeReactComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./components/${kebab}`] = ''
    const code = formatReactCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

async function writeVueComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./components/${kebab}`] = ''
    const code = formatVueCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

async function writeSvelteComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./components/${kebab}`] = ''
    const code = formatSvelteCode(kebab)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${kebab}.gen.svelte`,
      code,
    )

    const codeTs = formatSvelteTsCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, codeTs)
  }
}

async function writeSolidComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./components/${kebab}`] = ''
    const code = formatSolidCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

async function writePreactComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./components/${kebab}`] = ''
    const code = formatPreactCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

function formatReactCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { ${pascal} as ${pascal}Element, type ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/components/${kebab}'
import React, { type ComponentType } from 'react'

export type ${pascal}Props = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & ${pascal}ElementProps>

const ${pascal}Component = createComponent({
  tagName: 'prosekit-${kebab}',
  elementClass: ${pascal}Element,
  react: React,
  displayName: '${pascal}Component',
})

export const ${pascal}: ComponentType<${pascal}Props> = (props) => {
  return React.createElement(${pascal}Component, props)
}
`.trim() + '\n'
  )
}

function formatVueCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/lit/components/${kebab}'

import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/components/${kebab}'
import { defineComponent, h } from 'vue'

export type ${pascal}Props = {
  class?: string,
} & ${pascal}ElementProps

export const ${pascal} = defineComponent<${pascal}Props>(
  (props, { slots }) => {
    return () => h('prosekit-${kebab}', props, slots.default?.())
  }
)
`.trim() + '\n'
  )
}

function formatSvelteCode(kebab: string) {
  return (
    `
<script lang="ts">
import '@prosekit/lit/components/${kebab}'
</script>

<prosekit-${kebab} {...$$props}>
  <slot />
</prosekit-${kebab}>
`.trim() + '\n'
  )
}

function formatSvelteTsCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/components/${kebab}'
import type { SvelteComponent } from 'svelte'

import ${pascal}Component from './${kebab}.gen.svelte'

export type ${pascal}Props = {
  class?: string
} & ${pascal}ElementProps

export const ${pascal} = ${pascal}Component as typeof SvelteComponent<any> as typeof SvelteComponent<${pascal}Props>
`.trim() + '\n'
  )
}

function formatSolidCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
/* eslint-disable @typescript-eslint/no-namespace */

import '@prosekit/lit/components/${kebab}'

import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/components/${kebab}'
import type { Component, JSXElement } from 'solid-js'
import h from 'solid-js/h'

export type ${pascal}Props = {
  class?: string
  children?: JSXElement
} & ${pascal}ElementProps

export const ${pascal}: Component<${pascal}Props> = (props) => {
  return h('prosekit-${kebab}', props)
}
`.trim() + '\n'
  )
}

function formatPreactCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/lit/components/${kebab}'
import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/components/${kebab}'
import type { ComponentChildren, ComponentType } from 'preact'
import { h } from 'preact'

export type ${pascal}Props = {
  class?: string
  children?: ComponentChildren
} & ${pascal}ElementProps

export const ${pascal}: ComponentType<${pascal}Props> = (props) => {
  return h('prosekit-${kebab}', props)
}
`.trim() + '\n'
  )
}

/**
 * Returns a list of components names in kebab case
 * e.g. ["menu-item", "menu"]
 */
function readLitComponents(pkg: Package): string[] {
  return Object.keys((pkg.packageJson as any).exports)
    .filter((key) => key.startsWith('./components/'))
    .map((key) => key.slice('./components/'.length))
}
