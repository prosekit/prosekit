import type { Package } from '@manypkg/get-packages'
import {
  camelCase,
  kebabCase,
  pascalCase,
} from 'change-case'

import { getPackageJsonExports } from './get-package-json-exports.js'
import {
  readComponents,
  type GroupedComponents as Components,
} from './read-components.js'
import { vfs } from './virtual-file-system.js'

export async function genComponents() {
  const webPackages = await vfs.getPackageByName('@prosekit/web')

  const reactPackage = await vfs.getPackageByName('@prosekit/react')
  const vuePackage = await vfs.getPackageByName('@prosekit/vue')
  const sveltePackage = await vfs.getPackageByName('@prosekit/svelte')
  const solidPackage = await vfs.getPackageByName('@prosekit/solid')
  const preactPackage = await vfs.getPackageByName('@prosekit/preact')
  const litPackage = await vfs.getPackageByName('@prosekit/lit')

  await vfs.cleanGeneratedFilesInPackage(reactPackage)
  await vfs.cleanGeneratedFilesInPackage(reactPackage)
  await vfs.cleanGeneratedFilesInPackage(vuePackage)
  await vfs.cleanGeneratedFilesInPackage(sveltePackage)
  await vfs.cleanGeneratedFilesInPackage(solidPackage)
  await vfs.cleanGeneratedFilesInPackage(preactPackage)
  await vfs.cleanGeneratedFilesInPackage(litPackage)

  const components = await readComponents()
  await writeWebComponents(webPackages, components)
  await writeReactComponents(reactPackage, components)
  await writeVueComponents(vuePackage, components)
  await writeSvelteComponents(sveltePackage, components)
  await writeSolidComponents(solidPackage, components)
  await writePreactComponents(preactPackage, components)
  await writeLitComponents(litPackage, components)
}

async function writeWebComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatPrimitiveIndexCode(components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )

    for (const component of components) {
      const code = formatPrimitiveElementCode(component)
      const path = `src/components/${group}/${component}/element.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeReactComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatReactIndexCode(components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )

    for (const component of components) {
      const code = formatReactComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeVueComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatVueIndexCode(components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )

    for (const component of components) {
      const code = formatVueComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeSvelteComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatSvelteIndexCode(components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )

    for (const component of components) {
      const code = formatSvelteComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.svelte`
      await vfs.updateTextInPackage(pkg, path, code)
    }
    for (const component of components) {
      const code = formatSvelteTsCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeSolidComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatSolidIndexCode(components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )

    for (const component of components) {
      const code = formatSolidComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writePreactComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatPreactIndexCode(components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )

    for (const component of components) {
      const code = formatPreactComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeLitComponents(pkg: Package, info: Components) {
  const exports = getPackageJsonExports(pkg)!

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatLitIndexCode(group, components)
    await vfs.updateTextInPackage(
      pkg,
      `src/components/${group}/index.gen.ts`,
      code,
    )
  }
}

function formatPrimitiveIndexCode(components: string[]) {
  const lines = components.flatMap((kebab) => {
    const pascal = pascalCase(kebab)
    const camel = camelCase(kebab)
    return [
      `export { ${pascal}Element } from './${kebab}/element.gen'`,
      `export { ${camel}Events, ${camel}Props, type ${pascal}Events, type ${pascal}Props } from './${kebab}/types'`,
      '',
    ]
  })

  lines.unshift(
    '// This file is generated by packages/dev/src/gen-components.ts',
    '',
  )

  return lines.join('\n')
}

function formatPrimitiveElementCode(kebab: string) {
  const pascal = pascalCase(kebab)
  const camel = camelCase(kebab)
  return (
    `
import { defineCustomElement, registerCustomElement, type BaseElementConstructor } from "@aria-ui/core"

import { use${pascal} } from "./setup"
import { ${camel}Events, ${camel}Props, type ${pascal}Events, type ${pascal}Props } from "./types"

const ${pascal}ElementBase: BaseElementConstructor<${pascal}Props> = defineCustomElement<
  ${pascal}Props,
  ${pascal}Events
>({
  props: ${camel}Props,
  events: ${camel}Events,
  setup: use${pascal},
})
class ${pascal}Element extends ${pascal}ElementBase {}

registerCustomElement('prosekit-${kebab}', ${pascal}Element)
  
export { ${pascal}Element }

`.trim() + '\n'
  )
}

function formatReactIndexCode(components: string[]) {
  const lines = components.flatMap((name) => {
    const kebab = kebabCase(name)
    const pascal = pascalCase(name)
    return [
      `export { ${pascal}, type ${pascal}Props } from './${kebab}.gen'`,
      '',
    ]
  })
  return lines.join('\n')
}

function formatVueIndexCode(components: string[]) {
  const lines = components.flatMap((name) => {
    const kebab = kebabCase(name)
    const pascal = pascalCase(name)
    return [
      `export { ${pascal}, type ${pascal}Props, type ${pascal}Emits } from './${kebab}.gen'`,
      '',
    ]
  })
  return lines.join('\n')
}

function formatSvelteIndexCode(components: string[]) {
  return formatReactIndexCode(components)
}

function formatSolidIndexCode(components: string[]) {
  return formatReactIndexCode(components)
}

function formatPreactIndexCode(components: string[]) {
  return formatReactIndexCode(components)
}

function formatLitIndexCode(group: string, components: string[]) {
  const lines = components.flatMap((kebab) => {
    const pascal = pascalCase(kebab)
    return [
      `export { ${pascal}Element as ${pascal} } from '@prosekit/web/${group}'`,
      '',
    ]
  })

  return lines.join('\n')
}

function formatReactComponentCode(group: string, kebab: string) {
  const pascal = pascalCase(kebab)
  const camel = camelCase(kebab)

  return (
    `
import {
  type ${pascal}Element,
  type ${pascal}Props as Props,
  type ${pascal}Events as Events,
  ${camel}Props,
  ${camel}Events,
} from '@prosekit/web/${group}'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link ${pascal}} component.
 */
export interface ${pascal}Props extends Partial<CreateProps<Props, Events>> {}
 
export const ${pascal}: ForwardRefExoticComponent<
  ${pascal}Props &
  RefAttributes<${pascal}Element> &
  HTMLAttributes<${pascal}Element>
> = createComponent<
  ${pascal}Props, 
  ${pascal}Element
>(
  'prosekit-${kebab}',
  '${pascal}',
  Object.keys(${camel}Props),
  Object.keys(${camel}Events),
)
`.trim() + '\n'
  )
}

function formatVueComponentCode(group: string, kebab: string) {
  const pascal = pascalCase(kebab)
  const camel = camelCase(kebab)
  return (
    `

import {
  ${camel}Props,
  ${camel}Events,
  type ${pascal}Props as Props,
  type ${pascal}Events as Events,
} from '@prosekit/web/${group}'
import type { DefineSetupFnComponent, HTMLAttributes } from 'vue'

import { createComponent } from '../create-component'
import type { CreateEmits } from '../create-emits'

/**
 * Props for the {@link ${pascal}} component.
 */
export interface ${pascal}Props extends Partial<Props> {}

/**
 * Emits for the {@link ${pascal}} component.
 */
export interface ${pascal}Emits extends CreateEmits<Events> {}

export const ${pascal}: DefineSetupFnComponent<
  ${pascal}Props & HTMLAttributes,
  ${pascal}Emits
> = createComponent<
  ${pascal}Props,
  ${pascal}Emits
>(
  'prosekit-${kebab}',
  '${pascal}',
  Object.keys(${camel}Props),
  Object.keys(${camel}Events),
)
`.trim() + '\n'
  )
}

function formatSvelteComponentCode(group: string, kebab: string) {
  const camel = camelCase(kebab)

  return (
    `
<script lang="ts">
import '@prosekit/web/${group}'

import { ${camel}Props, ${camel}Events } from '@prosekit/web/${group}'
import { ClientUpdate } from '../client-update'
import { useComponent } from '../use-component'
import { useEventHandlers } from '../use-event-handlers'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(${camel}Props), Object.keys(${camel}Events))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-${kebab} {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-${kebab}>
</ClientUpdate>
`.trim() + '\n'
  )
}

function formatSvelteTsCode(group: string, kebab: string) {
  const pascal = pascalCase(kebab)
  return (
    `
import type { ${pascal}Element, ${pascal}Props as Props, ${pascal}Events as Events } from '@prosekit/web/${group}'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './${kebab}.gen.svelte'

/**
 * Props for the {@link ${pascal}} component.
 */
export interface ${pascal}Props extends Partial<CreateProps<Props, Events>> {}

export const ${pascal} = Component as typeof SvelteComponent<${pascal}Props & HTMLAttributes<${pascal}Element>>
  
`.trim() + '\n'
  )
}

function formatSolidComponentCode(group: string, kebab: string) {
  const pascal = pascalCase(kebab)
  const camel = camelCase(kebab)
  return (
    `
import { 
  type ${pascal}Element,
  type ${pascal}Props as Props,
  type ${pascal}Events as Events,
  ${camel}Props,
  ${camel}Events,
} from '@prosekit/web/${group}'
import type { Component } from 'solid-js'

import type { PropsWithElement } from '../../types'
import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link ${pascal}} component.
 */
export interface ${pascal}Props extends Partial<CreateProps<Props, Events>> {}

export const ${pascal}: Component<PropsWithElement<
  ${pascal}Props,
  ${pascal}Element
>> = createComponent<
  ${pascal}Props,
  ${pascal}Element
>(
  'prosekit-${kebab}', 
  Object.keys(${camel}Props),
  Object.keys(${camel}Events),
)

`.trim() + '\n'
  )
}

function formatPreactComponentCode(group: string, kebab: string) {
  const pascal = pascalCase(kebab)
  const camel = camelCase(kebab)
  return (
    `
import {
  type ${pascal}Element,
  type ${pascal}Props as Props,
  type ${pascal}Events as Events,
  ${camel}Props,
  ${camel}Events,
} from '@prosekit/web/${group}'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'
import type { CreateProps } from '../create-props'

/**
 * Props for the {@link ${pascal}} component.
 */
export interface ${pascal}Props extends Partial<CreateProps<Props, Events>> {}
 
export const ${pascal}: ForwardRefExoticComponent<
  Partial<${pascal}Props> &
  RefAttributes<${pascal}Element> &
  HTMLAttributes<${pascal}Element>
> = createComponent<
  ${pascal}Props, 
  ${pascal}Element
>(
  'prosekit-${kebab}',
  '${pascal}',
  Object.keys(${camel}Props),
  Object.keys(${camel}Events),
)
`.trim() + '\n'
  )
}
