import path from 'node:path'

/**
 * The list of frameworks supported by the registry. Sorted by popularity.
 *
 * https://tanstack.com/stats/npm?packageGroups=%5B%7B%22packages%22%3A%5B%7B%22name%22%3A%22react%22%7D%5D%2C%22color%22%3A%22%2361DAFB%22%7D%2C%7B%22packages%22%3A%5B%7B%22name%22%3A%22vue%22%7D%5D%2C%22color%22%3A%22%2341B883%22%7D%2C%7B%22packages%22%3A%5B%7B%22name%22%3A%22%40angular%2Fcore%22%7D%5D%2C%22color%22%3A%22%23DD0031%22%7D%2C%7B%22packages%22%3A%5B%7B%22name%22%3A%22svelte%22%7D%5D%2C%22color%22%3A%22%23FF3E00%22%7D%2C%7B%22packages%22%3A%5B%7B%22name%22%3A%22solid-js%22%7D%5D%2C%22color%22%3A%22%232C4F7C%22%7D%2C%7B%22packages%22%3A%5B%7B%22name%22%3A%22preact%22%7D%5D%2C%22color%22%3A%22%23673AB8%22%7D%2C%7B%22packages%22%3A%5B%7B%22name%22%3A%22lit%22%7D%5D%7D%5D&range=90-days&transform=none&binType=weekly&showDataMode=all&height=400
 *
 * NPM download stats on 2026 January
 * react          53.8 M
 * preact          9.8 M
 * vue             7.0 M
 * @angular/core   3.9 M
 * lit             3.4 M
 * svelte          2.1 M
 * solid-js        1.3 M
 */
export const FRAMEWORKS = Object.freeze(
  [
    'react',
    'preact',
    'vue',
    'lit',
    'svelte',
    'solid',
    'vanilla',
  ] as const,
)

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
    hasIcons: boolean
    hidden: boolean
    readonly accumulatedFiles: Set<string>
    readonly internalDependencies: Set<string>
  }
}
