import { Package } from '@manypkg/get-packages'

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

function formatReactCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
/**
 * @module @prosekit/react/components/${kebab}
 */

import { createComponent } from '@lit-labs/react'
import { ${pascal} as ${pascal}Element } from '@prosekit/lit/elements/${kebab}'
import React from 'react'

export const ${pascal} = createComponent({
  tagName: 'prosekit-${kebab}',
  elementClass: ${pascal}Element,
  react: React,
  displayName: '${pascal}',
})
`.trim() + '\n'
  )
}

function formatVueCode(kebab: string) {
  const pascal = kebabToPascal(kebab)
  return (
    `
/**
 * @module @prosekit/vue/components/${kebab}
 */

import '@prosekit/lit/elements/${kebab}'
import type { ${pascal} as ${pascal}Element } from '@prosekit/lit/elements/${kebab}'
import { defineComponent, h } from 'vue'

export const ${pascal} = defineComponent<Partial<${pascal}Element>>(
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
    .filter((key) => key.startsWith('./elements/'))
    .map((key) => key.slice('./elements/'.length))
}
