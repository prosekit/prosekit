import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineMarkSpec,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'
import { defineBold } from 'prosekit/extensions/bold'
import { defineCode } from 'prosekit/extensions/code'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineImage } from 'prosekit/extensions/image'
import { defineItalic } from 'prosekit/extensions/italic'
import { defineLinkMarkRule, defineLinkSpec } from 'prosekit/extensions/link'
import { defineList } from 'prosekit/extensions/list'
import { defineMarkRule } from 'prosekit/extensions/mark-rule'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineStrike } from 'prosekit/extensions/strike'
import { defineTable } from 'prosekit/extensions/table'
import { defineUnderline } from 'prosekit/extensions/underline'
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection'

export function defineExtension() {
  return union([
    defineDoc(),
    defineText(),
    defineHeading(),
    defineHistory(),
    defineList(),
    defineBlockquote(),
    defineBaseKeymap(),
    defineBaseCommands(),
    defineItalic(),
    defineBold(),
    defineUnderline(),
    defineStrike(),
    defineCode(),

    defineImage(),
    defineParagraph(),
    defineDropCursor(),
    defineVirtualSelection(),
    defineTable(),

    defineLinkSpec(),
    defineLinkMarkRule(),

    definePlaceholder({
      placeholder: 'Try typing #123',
    }),

    defineMarkSpec({
      name: 'issueLink',
      inclusive: false,
      attrs: {
        issueNumber: {},
      },
      toDOM(node) {
        const issueNumber = node.attrs.issueNumber as number
        return [
          'a',
          {
            href: `https://example.com/issue/${issueNumber}`,
            title: `Issue #${issueNumber}`,
          },
          0,
        ]
      },
    }),

    defineMarkRule({
      regex: /#(\d+)/g,
      type: 'issueLink',
      attrs: (match) => {
        return { issueNumber: Number.parseInt(match[1]) }
      },
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
