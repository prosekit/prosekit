import type { MarkSpec, NodeSpec } from '@prosekit/pm/model'

import { mergeObjects } from './merge-objects'

function mergeSpecs(a: NodeSpec, b: NodeSpec): NodeSpec
function mergeSpecs(a: MarkSpec, b: MarkSpec): MarkSpec
function mergeSpecs(
  a: NodeSpec | MarkSpec,
  b: NodeSpec | MarkSpec,
): NodeSpec | MarkSpec {
  type T = typeof a

  const attrs: T['attrs'] = {}
  const attrNames = new Set([
    ...Object.keys(a.attrs ?? {}),
    ...Object.keys(b.attrs ?? {}),
  ])
  for (const name of attrNames) {
    const attrSpecA = a.attrs?.[name]
    const attrSpecB = b.attrs?.[name]
    const attrSpecMerged = mergeObjects(attrSpecA, attrSpecB)
    if (attrSpecMerged) {
      attrs[name] = attrSpecMerged
    }
  }

  const parseDOM: T['parseDOM'] = [...(a.parseDOM ?? []), ...(b.parseDOM ?? [])]

  return mergeObjects<T>(a, b, { attrs, parseDOM })
}

export { mergeSpecs }
