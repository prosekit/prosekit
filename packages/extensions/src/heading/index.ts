import {
  defineCommands,
  defineKeymap,
  defineNodeSpec,
  insertNode,
  setBlockType,
  toggleNode,
  union,
} from '@prosekit/core'

import { defineTextBlockInputRule } from '../input-rule'

export interface HeadingAttrs {
  level: number
}

export function defineHeadingSpec() {
  return defineNodeSpec({
    name: 'heading',
    attrs: { level: { default: 1 } },
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

export function defineHeadingKeymap() {
  return defineKeymap({
    'mod-1': toggleNode({ type: 'heading', attrs: { level: 1 } }),
    'mod-2': toggleNode({ type: 'heading', attrs: { level: 2 } }),
    'mod-3': toggleNode({ type: 'heading', attrs: { level: 3 } }),
    'mod-4': toggleNode({ type: 'heading', attrs: { level: 4 } }),
    'mod-5': toggleNode({ type: 'heading', attrs: { level: 5 } }),
    'mod-6': toggleNode({ type: 'heading', attrs: { level: 6 } }),
  })
}

export function defineHeadingInputRule() {
  return defineTextBlockInputRule({
    regex: /^(#{1,6})\s$/,
    type: 'heading',
    attrs: (match) => {
      const level: number = match[1]?.length ?? 1
      return { level } satisfies HeadingAttrs
    },
  })
}

export function defineHeadingCommands() {
  return defineCommands({
    setHeading: (attrs?: HeadingAttrs) => {
      return setBlockType({ type: 'heading', attrs })
    },
    insertHeading: (attrs?: HeadingAttrs) => {
      return insertNode({ type: 'heading', attrs })
    },
    toggleHeading: (attrs?: HeadingAttrs) => {
      return toggleNode({ type: 'heading', attrs })
    },
  })
}

/**
 * @public
 */
export function defineHeading() {
  return union([
    defineHeadingSpec(),
    defineHeadingInputRule(),
    defineHeadingKeymap(),
    defineHeadingCommands(),
  ])
}
