import { type Package } from '@manypkg/get-packages'

import { kebabToPascal } from './kebab-to-pascal'
import { vfs } from './virtual-file-system'

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

  const components = await readWeb(webPackages)
  await writeWebComponents(webPackages, components)
  await writeReactComponents(reactPackage, components)
  await writeVueComponents(vuePackage, components)
  await writeSvelteComponents(sveltePackage, components)
  await writeSolidComponents(solidPackage, components)
  await writePreactComponents(preactPackage, components)
  await writeLitComponents(litPackage, components)
}

async function writeWebComponents(pkg: Package, info: Components) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatPrimitiveIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatPrimitiveElementCode(component)
      const path = `src/components/${group}/${component}/element.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeReactComponents(pkg: Package, info: Components) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatReactIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatReactComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeVueComponents(pkg: Package, info: Components) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatVueIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatVueComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeSvelteComponents(pkg: Package, info: Components) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatSvelteIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

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
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatSolidIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatSolidComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writePreactComponents(pkg: Package, info: Components) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatPreactIndexCode(components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)

    for (const component of components) {
      const code = formatPreactComponentCode(group, component)
      const path = `src/components/${group}/${component}.gen.ts`
      await vfs.updateTextInPackage(pkg, path, code)
    }
  }
}

async function writeLitComponents(pkg: Package, info: Components) {
  const exports = (pkg.packageJson as any).exports

  for (const [group, components] of Object.entries(info)) {
    exports[`./${group}`] = ''

    const code = formatLitIndexCode(group, components)
    await vfs.updateTextInPackage(pkg, `src/components/${group}/index.ts`, code)
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
  return (
    `
import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { default${pascal}Props, type ${pascal}Props } from './props'
import { use${pascal} } from './state'

class ${pascal}Element extends ElementBuilder<${pascal}Props>(use${pascal}, default${pascal}Props) {}

defineCustomElement('prosekit-${kebab}', ${pascal}Element)

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

function formatVueIndexCode(components: string[]) {
  return formatReactIndexCode(components)
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
    const pascal = kebabToPascal(kebab)
    return [
      `export { ${pascal}Element as ${pascal} } from '@prosekit/web/${group}'`,
      '',
    ]
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
} from '@prosekit/web/${group}'
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
  'prosekit-${kebab}',
  '${pascal}',
  default${pascal}Props,
)
    
`.trim() + '\n'
  )
}

function formatVueComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `

import { default${pascal}Props, type ${pascal}Props } from '@prosekit/web/${group}'

import { createComponent } from '../create-component'

export const ${pascal} = createComponent<${pascal}Props>('prosekit-${kebab}', '${pascal}', default${pascal}Props)

`.trim() + '\n'
  )
}

function formatSvelteComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)

  return (
    `
<script lang="ts">
import '@prosekit/web/${group}'
import { default${pascal}Props } from '@prosekit/web/${group}'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined 
const handleChange = useWebComponent(default${pascal}Props)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<prosekit-${kebab} {...attributes} bind:this={element}>
  <slot />
</prosekit-${kebab}>
`.trim() + '\n'
  )
}

function formatSvelteTsCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import type { ${pascal}Props } from '@prosekit/web/${group}'    
import type { SvelteComponent } from 'svelte'

import Component from './${kebab}.gen.svelte'

export const ${pascal} = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<${pascal}Props> & {class?: string}>
  
`.trim() + '\n'
  )
}

function formatSolidComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import { 
  ${pascal}Element,
  default${pascal}Props,
  type ${pascal}Props,
} from '@prosekit/web/${group}'

import { createComponent } from '../create-component'

export const ${pascal} = createComponent<
  ${pascal}Props,
  ${pascal}Element
>(
  'prosekit-${kebab}', 
  default${pascal}Props,
)

`.trim() + '\n'
  )
}

function formatPreactComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import {
  ${pascal}Element,
  default${pascal}Props,
  type ${pascal}Props,
} from '@prosekit/web/${group}'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'preact/compat'

import { createComponent } from '../create-component'

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
  default${pascal}Props,
)

`.trim() + '\n'
  )
}

/**
 * Returns a list of components names in kebab case
 * e.g. { 'resizable': [ 'resizable-handle', 'resizable-root' ] }
 */
async function readWeb(pkg: Package): Promise<Components> {
  const filePaths = await vfs.getFilePathsByPackage(pkg)

  const result: Components = {}

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

type Components = { [group: string]: string[] }
