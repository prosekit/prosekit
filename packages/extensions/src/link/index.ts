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

import { LINK_ENTER_RE, LINK_INPUT_RE, LINK_MARK_RE } from './link-regex'

/**
 * @public
 */
export interface LinkAttrs {
  href: string
}

export function defineLinkSpec() {
  return defineMarkSpec<'link', LinkAttrs>({
    name: 'link',
    inclusive: false,
    attrs: {
      href: {},
    },
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

/**
 * Apply link marks after pressing Space.
 */
export function defineLinkInputRule() {
  return defineInputRule(
    new InputRule(LINK_INPUT_RE, (state, match, from) => {
      const href = match[1]
      if (!href) return null

      const mark = state.schema.marks.link.create({ href })
      return state.tr.addMark(from, from + href.length, mark).insertText(' ')
    }),
  )
}

/**
 * Apply link marks after typing Enter.
 */
export function defineLinkEnterRule() {
  return defineEnterRule({
    regex: LINK_ENTER_RE,
    handler: ({ state, from, match }) => {
      const href = match[1]
      if (!href) return null

      const mark = state.schema.marks.link.create({ href })
      const tr = state.tr.addMark(from, from + href.length, mark)
      return tr.docChanged ? tr : null
    },
  })
}

/**
 * Apply and remove link marks to the text during typing.
 */
export function defineLinkMarkRule() {
  return defineMarkRule({
    regex: LINK_MARK_RE,
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
