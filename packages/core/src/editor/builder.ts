import type { Schema } from '@prosekit/pm/model'

import type { Extension, ExtractNodeBuilders } from '../types/extension.ts'

import { createNodeBuildersRaw } from './action.ts'

/**
 * TODO: Document this function.
 *
 * @example
 *
 * ```ts
 * TODO: ADD EXAMPLE
 * ````
 */
export function createNodeBuilders<E extends Extension>(schema: Schema): ExtractNodeBuilders<E> {
  const nodeBuilders = createNodeBuildersRaw(schema)
  return nodeBuilders as ExtractNodeBuilders<E>
}
