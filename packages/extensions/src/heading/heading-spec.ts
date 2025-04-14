import {
  defineNodeSpec,
  type Extension,
} from '@prosekit/core'

import type { HeadingAttrs } from './heading-types'

/**
 * @internal
 */
export type HeadingSpecExtension = Extension<{
  Nodes: {
    heading: HeadingAttrs
  }
}>

/**
 * @internal
 */
export function defineHeadingSpec(): HeadingSpecExtension {
  return defineNodeSpec({
    name: 'heading',
    attrs: { level: { default: 1, validate: 'number' } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } },
    ],
    toDOM(node) {
      return [`h${node.attrs.level}`, 0]
    },
  })
}
