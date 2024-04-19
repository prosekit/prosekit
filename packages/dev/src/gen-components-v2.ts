import { type Package } from '@manypkg/get-packages'

import { kebabToPascal } from './kebab-to-pascal'
import { vfs } from './virtual-file-system'

export async function genComponents() {
  const primitivesPackage = await vfs.getPackageByName('@prosekit/primitives')

  // const litPackage = await vfs.getPackageByName('@prosekit/lit')
  const reactPackage = await vfs.getPackageByName('@prosekit/react')
  const vuePackage = await vfs.getPackageByName('@prosekit/vue')
  const sveltePackage = await vfs.getPackageByName('@prosekit/svelte')
  const solidPackage = await vfs.getPackageByName('@prosekit/solid')
  const preactPackage = await vfs.getPackageByName('@prosekit/preact')

  // await vfs.cleanGeneratedFilesInPackage(reactPackage)
  // await vfs.cleanGeneratedFilesInPackage(vuePackage)
  // await vfs.cleanGeneratedFilesInPackage(sveltePackage)
  // await vfs.cleanGeneratedFilesInPackage(solidPackage)
  // await vfs.cleanGeneratedFilesInPackage(preactPackage)

  const primitives = await readPrimitives(primitivesPackage)
  await writePrimitivesComponent(primitivesPackage, primitives)
  await writeReactComponent(reactPackage, primitives)

  if (Math.random() > 2) {
    await writeVueComponents(vuePackage, ['componentNames'])
    await writeSvelteComponents(sveltePackage, ['componentNames'])
    await writeSolidComponents(solidPackage, ['componentNames'])
    await writePreactComponents(preactPackage, ['componentNames'])
  }
}

async function writePrimitivesComponent(pkg: Package, info: Primitives) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatPrimitiveIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatPrimitiveElementCode(component)
      await vfs.updateTextInPackage(
        pkg,
        `src/components/${group}/${component}/element.gen.ts`,
        code,
      )
    }
  }
}

async function writeReactComponent(pkg: Package, info: Primitives) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatReactIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatReactComponentCode(group, component)
      await vfs.updateTextInPackage(
        pkg,
        `src/components/${group}/${component}.gen.ts`,
        code,
      )
    }
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

function formatPrimitiveIndexCode(components: string[]) {
  const lines = components.flatMap((kebab) => {
    const pascal = kebabToPascal(kebab)
    return [
      `export { ${pascal}Element } from './${kebab}/element.gen'`,
      `export { default${pascal}Props } from './${kebab}/props'`,
      `export type { ${pascal}Props } from './${kebab}/props'`,
      '',
    ]
  })

  return lines.join('\n')
}

function formatPrimitiveElementCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  // TODO: remove -v2 in the template
  return (
    `

import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { default${pascal}Props, type ${pascal}Props } from './props'
import { use${pascal} } from './state'

class ${pascal}Element extends BaseElement implements ${pascal}Props {
  readonly _s: SignalState<${pascal}Props>

  constructor() {
    super()
    this._s = use${pascal}(this)
  }
}

interface ${pascal}Element extends ${pascal}Props {}

defineProperties(${pascal}Element, default${pascal}Props)

defineCustomElement('prosekit-${kebab}-v2', ${pascal}Element)

export { ${pascal}Element }
    
`.trim() + '\n'
  )
}

function formatReactIndexCode(components: string[]) {
  const lines = components.flatMap((kebab) => {
    const pascal = kebabToPascal(kebab)
    return [`export { ${pascal} } from './${kebab}.gen'`, '']
  })

  return lines.join('\n')
}

function formatReactComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `

import {
  ${pascal}Element,
  default${pascal}Props,
  type ${pascal}Props,
} from '@prosekit/primitives/${group}'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'

export const ${pascal}: ForwardRefExoticComponent<
  Partial<${pascal}Props> &
  RefAttributes<${pascal}Element> &
  HTMLAttributes<${pascal}Element>
> = createComponent<
  ${pascal}Props, 
  ${pascal}Element
>(
  '${kebab}-v2',
  '${pascal}',
  default${pascal}Props,
)
    
`.trim() + '\n'
  )
}

function formatVueCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/lit/${kebab}'

import { type ${pascal}Props as ${pascal}ElementProps, propNames } from '@prosekit/lit/${kebab}'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type ${pascal}Props = PropsWithClass<${pascal}ElementProps>

export const ${pascal}: DefineSetupFnComponent<${pascal}Props> = defineComponent<${pascal}Props>(
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
  return h('prosekit-${kebab}', props as object)
}
`.trim() + '\n'
  )
}

/**
 * Returns a list of components names in kebab case
 * e.g. { 'resizable': [ 'resizable-handle', 'resizable-root' ] }
 */
async function readPrimitives(pkg: Package): Promise<Primitives> {
  const filePaths = await vfs.getFilePathsByPackage(pkg)

  const result: Primitives = {}

  for (const filePath of filePaths) {
    const re = /components\/(?<group>.*)\/(?<component>.*)\/props\.ts$/
    const match = re.exec(filePath)

    if (!match) {
      continue
    }

    const { group, component } = match.groups as Record<string, string>
    const components = (result[group] ||= [])
    components.push(component)
  }

  return result
}

type Primitives = { [group: string]: string[] }
