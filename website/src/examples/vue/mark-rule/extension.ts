import {
  defineBaseCommands,
  defineBaseKeymap,
  defineHistory,
  union,
} from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import {
  defineLinkMarkRule,
  defineLinkSpec,
} from 'prosekit/extensions/link'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineText } from 'prosekit/extensions/text'
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection'

import { defineIssueLink } from './issue-link'

export function defineExtension() {
  return union(
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
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
