import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineLinkMarkRule, defineLinkSpec } from 'prosekit/extensions/link'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection'

import { defineIssueLink } from './issue-link'

export function defineExtension() {
  return union([
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHistory(),
    defineBaseKeymap(),
    defineBaseCommands(),
    defineVirtualSelection(),
    defineLinkSpec(),
    defineLinkMarkRule(),
    definePlaceholder({ placeholder: 'Try typing #123' }),
    defineIssueLink(),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
