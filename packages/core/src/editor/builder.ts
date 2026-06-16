import type { Schema } from '@prosekit/pm/model'

import type { Extension, ExtractMarkBuilders, ExtractNodeBuilders } from '../types/extension.ts'

import { createMarkBuildersRaw, createNodeBuildersRaw } from './action.ts'

/**
 * Creates a set of typed node builders from a {@link Schema}.
 *
 * Each returned builder creates a {@link ProseMirrorNode} for one node type in
 * the schema. A builder accepts an optional attributes object followed by any
 * number of children, where a child is a node, a string, or a nested array of
 * children.
 *
 * Unlike the {@link NodeAction}s exposed by `editor.nodes`, these builders are
 * not bound to an editor and have no `isActive` method, so you can use them
 * without creating an editor, for example in tests or when rendering on the
 * server.
 *
 * Pass your extension type as the type argument to type the builders to your
 * schema's node names and attributes.
 *
 * @param schema - The schema to create node builders for.
 *
 * @example
 *
 * ```ts
 * import { createEditor, createNodeBuilders } from 'prosekit/core'
 * import { defineBasicExtension } from 'prosekit/basic'
 *
 * const extension = defineBasicExtension()
 * const schema = createEditor({ extension }).schema
 *
 * const n = createNodeBuilders<typeof extension>(schema)
 *
 * const paragraph = n.paragraph('Hello world')
 * const heading = n.heading({ level: 1 }, 'Title')
 * const doc = n.doc(heading, paragraph)
 * ```
 */
export function createNodeBuilders<E extends Extension>(
  schema: Schema,
): ExtractNodeBuilders<E> {
  return createNodeBuildersRaw(schema) as ExtractNodeBuilders<E>
}

/**
 * Creates a set of typed mark builders from a {@link Schema}.
 *
 * Each returned builder applies one mark type from the schema to its children
 * and returns the resulting array of {@link ProseMirrorNode}s. A builder accepts
 * an optional attributes object followed by any number of children, where a
 * child is a node, a string, or a nested array of children.
 *
 * Unlike the {@link MarkAction}s exposed by `editor.marks`, these builders are
 * not bound to an editor and have no `isActive` method, so you can use them
 * without creating an editor, for example in tests or when rendering on the
 * server.
 *
 * Pass your extension type as the type argument to type the builders to your
 * schema's mark names and attributes.
 *
 * @param schema - The schema to create mark builders for.
 *
 * @example
 *
 * ```ts
 * import { createEditor, createNodeBuilders, createMarkBuilders } from 'prosekit/core'
 * import { defineBasicExtension } from 'prosekit/basic'
 *
 * const extension = defineBasicExtension()
 * const schema = createEditor({ extension }).schema
 *
 * const n = createNodeBuilders<typeof extension>(schema)
 * const m = createMarkBuilders<typeof extension>(schema)
 *
 * const paragraph = n.paragraph('Hello ', m.bold('world'))
 * ```
 */
export function createMarkBuilders<E extends Extension>(
  schema: Schema,
): ExtractMarkBuilders<E> {
  return createMarkBuildersRaw(schema) as ExtractMarkBuilders<E>
}
