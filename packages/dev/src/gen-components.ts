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
    exports[`./${kebab}`] = ''
    const code = formatReactCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

async function writeVueComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./${kebab}`] = ''
    const code = formatVueCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

async function writeSvelteComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./${kebab}`] = ''
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
    exports[`./${kebab}`] = ''
    const code = formatSolidCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

async function writePreactComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./${kebab}`] = ''
    const code = formatPreactCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.ts`, code)
  }
}

function formatReactCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import { createComponent } from '@lit/react'
import { ${pascal} as ${pascal}Element, type ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/${kebab}'
import React from 'react'

import {type PropsWithClassName} from '../types'

export type ${pascal}Props = React.PropsWithChildren<PropsWithClassName<${pascal}ElementProps>>

const ${pascal}Inner = createComponent({
  tagName: 'prosekit-${kebab}',
  elementClass: ${pascal}Element,
  react: React,
  displayName: '${pascal}Inner',
})

export const ${pascal}: React.ComponentType<
  ${pascal}Props & React.RefAttributes<${pascal}Element>
> = React.forwardRef((props, ref) => {
  return React.createElement(${pascal}Inner, { ...props, ref })
})

${pascal}.displayName = '${pascal}'
`.trim() + '\n'
  )
}

function formatVueCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/lit/${kebab}'

import { type ${pascal}Props as ${pascal}ElementProps, propNames } from '@prosekit/lit/${kebab}'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type ${pascal}Props = PropsWithClass<${pascal}ElementProps>

export const ${pascal} = defineComponent<${pascal}Props>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-${kebab}', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
`.trim() + '\n'
  )
}

function formatSvelteCode(kebab: string) {
  return (
    `
<script lang="ts">
import '@prosekit/lit/${kebab}'
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
import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/${kebab}'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ${pascal}Component from './${kebab}.gen.svelte'

export type ${pascal}Props = PropsWithClass<${pascal}ElementProps>

export const ${pascal} = ${pascal}Component as typeof SvelteComponent<any> as typeof SvelteComponent<${pascal}Props>
`.trim() + '\n'
  )
}

function formatSolidCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/lit/${kebab}'

import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/${kebab}'
import type { Component } from 'solid-js'
import html from 'solid-js/html'

import type { PropsWithClass, PropsWithChildren } from '../types'
import { forceProps } from '../utils/force-props'

export type ${pascal}Props = PropsWithChildren<PropsWithClass<${pascal}ElementProps>>

export const ${pascal}: Component<${pascal}Props> = (props) => {
  return html\`<prosekit-${kebab} ...\${forceProps(props)} />\`
}
`.trim() + '\n'
  )
}

function formatPreactCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/lit/${kebab}'
import type { ${pascal}Props as ${pascal}ElementProps } from '@prosekit/lit/${kebab}'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type ${pascal}Props = PropsWithChildren<PropsWithClass<${pascal}ElementProps>>

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
  const paths: string[] = Object.values((pkg.packageJson as any).exports)
  const names: string[] = []

  for (const path of paths) {
    const match = /components\/([^/]*)\//.exec(path)
    if (match) {
      names.push(match[1])
    }
  }

  return names
}
