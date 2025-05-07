import {
  addMark,
  defineCommands,
  defineMarkSpec,
  expandMark,
  removeMark,
  toggleMark,
  union,
  type Extension,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'

import { defineEnterRule } from '../enter-rule'
import { defineInputRule } from '../input-rule'
import { defineMarkRule } from '../mark-rule'

import {
  LINK_ENTER_RE,
  LINK_INPUT_RE,
  LINK_MARK_RE,
} from './link-regex'

/**
 * @public
 */
export interface LinkAttrs {
  href: string
}

/**
 * @internal
 */
export type LinkSpecExtension = Extension<{
  Marks: {
    link: LinkAttrs
  }
}>

/**
 * @internal
 */
export function defineLinkSpec(): LinkSpecExtension {
  return defineMarkSpec<'link', LinkAttrs>({
    name: 'link',
    inclusive: false,
    attrs: {
      href: { validate: 'string' },
    },
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs: (dom: HTMLElement) => {
          return {
            href: dom.getAttribute('href') || '',
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

/**
 * @internal
 */
export type LinkCommandsExtension = Extension<{
  Commands: {
    addLink: [attrs: LinkAttrs]
    removeLink: []
    toggleLink: [attrs: LinkAttrs]
    expandLink: []
  }
}>

export function defineLinkCommands(): LinkCommandsExtension {
  return defineCommands({
    addLink: (attrs: LinkAttrs) => addMark({ type: 'link', attrs }),
    removeLink: () => removeMark({ type: 'link' }),
    toggleLink: (attrs: LinkAttrs) => toggleMark({ type: 'link', attrs }),
    expandLink: () => expandMark({ type: 'link' }),
  })
}

/**
 * Apply link marks after pressing Space.
 *
 * @internal
 */
export function defineLinkInputRule(): PlainExtension {
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
 *
 * @internal
 */
export function defineLinkEnterRule(): PlainExtension {
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
 *
 * @internal
 */
export function defineLinkMarkRule(): PlainExtension {
  return defineMarkRule({
    regex: LINK_MARK_RE,
    type: 'link',
    attrs: (match) => ({ href: match[1] }),
  })
}

/**
 * @internal
 */
export type LinkExtension = Union<[LinkSpecExtension, LinkCommandsExtension]>

/**
 * @public
 */
export function defineLink(): LinkExtension {
  return union(
    defineLinkSpec(),
    defineLinkCommands(),
    defineLinkInputRule(),
    defineLinkEnterRule(),
  )
}
