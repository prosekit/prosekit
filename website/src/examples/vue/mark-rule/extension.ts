import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineHistory,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import {
  defineLinkMarkRule,
  defineLinkSpec,
} from 'prosekit/extensions/link'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection'

import { defineIssueLink } from './issue-link'

export function defineExtension() {
  return union(
    defineDoc_DEBUG2(),
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
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
