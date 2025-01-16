import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineSearchCommands } from 'prosekit/extensions/search'

export function defineExtension() {
  return union(defineBasicExtension(), defineSearchCommands())
}

export type EditorExtension = ReturnType<typeof defineExtension>
