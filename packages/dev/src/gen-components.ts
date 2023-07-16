import { type Package } from '@manypkg/get-packages'

import { kebabToPascal } from './kebab-to-pascal'
import { vfs } from './virtual-file-system'

export async function genComponents() {
  const litPackage = await vfs.getPackageByName('@prosekit/lit')
  const reactPackage = await vfs.getPackageByName('@prosekit/react')
  const vuePackage = await vfs.getPackageByName('@prosekit/vue')

  await vfs.cleanGeneratedFilesInPackage(reactPackage)
  await vfs.cleanGeneratedFilesInPackage(vuePackage)

  const componentNames = readLitComponents(litPackage)
  await writeReactComponents(reactPackage, componentNames)
  await writeVueComponents(vuePackage, componentNames)
}

async function writeReactComponents(pkg: Package, componentNames: string[]) {
  const exports = (pkg.packageJson as any).exports
  for (const kebab of componentNames) {
    exports[`./components/${kebab}`] = ''
    const code = formatReactCode(kebab)
    await vfs.updateTextInPackage(pkg, `src/components/${kebab}.gen.tsx`, code)
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
  return <${pascal}Component {...props} />  
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

/**
 * Returns a list of components names in kebab case
 * e.g. ["menu-item", "menu"]
 */
function readLitComponents(pkg: Package): string[] {
  return Object.keys((pkg.packageJson as any).exports)
    .filter((key) => key.startsWith('./components/'))
    .map((key) => key.slice('./components/'.length))
}
