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

  await vfs.cleanGeneratedFilesInPackage(reactPackage)
  await vfs.cleanGeneratedFilesInPackage(vuePackage)
  await vfs.cleanGeneratedFilesInPackage(sveltePackage)
  await vfs.cleanGeneratedFilesInPackage(solidPackage)
  await vfs.cleanGeneratedFilesInPackage(preactPackage)

  const primitives = await readPrimitives(primitivesPackage)
  await writePrimitivesComponents(primitivesPackage, primitives)
  await writeReactComponents(reactPackage, primitives)
  await writeVueComponents(vuePackage, primitives)
  await writeSvelteComponents(sveltePackage, primitives)
  await writeSolidComponents(solidPackage, primitives)
  await writePreactComponents(preactPackage, primitives)
}

async function writePrimitivesComponents(pkg: Package, info: Primitives) {
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

async function writeReactComponents(pkg: Package, info: Primitives) {
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

async function writeVueComponents(pkg: Package, info: Primitives) {
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

async function writeSvelteComponents(pkg: Package, info: Primitives) {
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

async function writeSolidComponents(pkg: Package, info: Primitives) {
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

async function writePreactComponents(pkg: Package, info: Primitives) {
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

function formatVueComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `

import { default${pascal}Props, type ${pascal}Props } from '@prosekit/primitives/${group}'

import { createComponent } from '../create-component'

export const ${pascal} = createComponent<${pascal}Props>('prosekit-${kebab}', '${pascal}', default${pascal}Props)

`.trim() + '\n'
  )
}

function formatSvelteComponentCode(group: string, kebab: string) {
  return (
    `
<script lang="ts">
import '@prosekit/primitives/${group}'
</script>

<${kebab} {...$$props}>
  <slot />
</${kebab}>
`.trim() + '\n'
  )
}

function formatSvelteTsCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `

import type { ${pascal}Props } from '@prosekit/primitives/${group}'    
import type { SvelteComponent } from 'svelte'

import Component from './${kebab}.gen.svelte'

export const ${pascal} = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<${pascal}Props> & {class?: number}>
  
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
} from '@prosekit/primitives/${group}'

import { createComponent } from '../create-component'

export const ${pascal} = createComponent<
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

function formatPreactComponentCode(group: string, kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
import '@prosekit/primitives/${group}'

import type { 
  ${pascal}Element,
  ${pascal}Props,
} from '@prosekit/primitives/${group}'

import { createComponent } from '../create-component'

export const ${pascal} = createComponent<
  ${pascal}Props,
  ${pascal}Element
>(
  'prosekit-${kebab}', 
  '${pascal}',
)

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
