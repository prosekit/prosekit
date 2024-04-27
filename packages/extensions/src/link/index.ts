import {
  addMark,
  defineCommands,
  defineMarkSpec,
  expandMark,
  removeMark,
  toggleMark,
  union,
} from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'

import { defineEnterRule } from '../enter-rule'
import { defineInputRule } from '../input-rule'
import { defineMarkRule } from '../mark-rule'

import { LINK_RE, LINK_SPACE_RE } from './link-regex'

/**
 * @public
 */
export interface LinkAttrs {
  href: string
}

export function defineLinkSpec() {
  return defineMarkSpec({
    name: 'link',
    inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs: (dom) => {
          return {
            href: (dom as HTMLElement).getAttribute('href'),
          }
        },
      },
    ],
    attrs: {
      href: {},
    },
    toDOM(node) {
      const { href } = node.attrs as LinkAttrs
      return ['a', { href }, 0]
    },
  })
}

export function defineLinkCommands() {
  return defineCommands({
    addLink: (attrs: LinkAttrs) => addMark({ type: 'link', attrs }),
    removeLink: () => removeMark({ type: 'link' }),
    toggleLink: (attrs: LinkAttrs) => toggleMark({ type: 'link', attrs }),
    expandLink: () => expandMark({ type: 'link' }),
  })
}

export function defineLinkInputRule() {
  return defineInputRule(
    new InputRule(LINK_SPACE_RE, (state, match, from) => {
      const href = match[1]
      if (!href) return null

      const mark = state.schema.marks.link.create({ href })
      return state.tr.addMark(from, from + href.length, mark).insertText(' ')
    }),
  )
}

export function defineLinkEnterRule() {
  return defineEnterRule({
    regex: LINK_RE,
    handler: ({ state, from, match }) => {
      const href = match[1]
      if (!href) return null

      const mark = state.schema.marks.link.create({ href })
      const tr = state.tr.addMark(from, from + href.length, mark)
      return tr.docChanged ? tr : null
    },
  })
}

export function defineLinkMarkRule() {
  return defineMarkRule({
    regex: LINK_RE,
    type: 'link',
    attrs: (match) => ({ href: match[1] }),
  })
}

/**
 * @public
 */
export function defineLink() {
  return union([
    defineLinkSpec(),
    defineLinkCommands(),
    defineLinkInputRule(),
    defineLinkEnterRule(),
  ])
}
