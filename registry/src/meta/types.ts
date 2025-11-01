import path from 'node:path'

/**
 * The list of frameworks supported by the registry. Sorted by popularity.
 *
 * NPM download stats on 2025 March
 * react:          32,063,940
 * vue:             6,427,934
 * preact:          5,449,834
 * @angular/core:   3,961,622
 * lit:             2,306,263
 * svelte:          2,147,140
 * solid-js:          295,213
 */
export const FRAMEWORKS = Object.freeze(['react', 'vue', 'preact', 'svelte', 'solid'] as const)

export type Framework = (typeof FRAMEWORKS)[number]

export type ItemCategory = 'example' | 'sample' | 'ui'

/**
 * The source directory for all the items related to the root directory of the registry.
 */
export const REGISTRY_SRC_DIR = path.join('registry', 'src')

export interface ItemAccumulator {
  readonly framework: Framework
  readonly story: string // Empty string for samples and UI
  readonly category: ItemCategory
  readonly name: string
  readonly title: string
  readonly type: 'registry:block' | 'registry:component'
  readonly description: string
  readonly files: Set<string>
  readonly registryDependencies: Set<string>
  readonly dependencies: Set<string>
  readonly meta: {
    readonly accumulatedFiles: Set<string>
    readonly internalDependencies: Set<string>
  }
}
