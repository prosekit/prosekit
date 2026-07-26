import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineSearchCommands, defineSearchQuery } from 'prosekit/extensions/search'

export function defineExtension() {
  return union(defineBasicExtension(), defineSearchQuery(), defineSearchCommands())
}

export type EditorExtension = ReturnType<typeof defineExtension>
