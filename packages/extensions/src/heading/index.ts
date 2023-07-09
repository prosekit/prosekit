import {
  addInputRule,
  addNodeSpec,
  defineExtension,
  getNodeType,
} from '@prosekit/core'
import { textblockTypeInputRule } from '@prosekit/pm/inputrules'

export interface HeadingAttrs {
  level: number
}

export function addHeadingSpec() {
  return addNodeSpec({
    name: 'heading',
    spec: {
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
    },
  })
}

export function addHeadingInputRule() {
  return addInputRule(({ schema }) => {
    const nodeSpec = getNodeType(schema, 'heading')
    const inputRule = textblockTypeInputRule(
      /^(#{1,6})\s/,
      nodeSpec,
      (match) => {
        const level: number = match[1]?.length ?? 1
        return { level } satisfies HeadingAttrs
      },
    )
    return [inputRule]
  })
}

/** @public */
export function addHeading() {
  return defineExtension([addHeadingSpec(), addHeadingInputRule()])
}
