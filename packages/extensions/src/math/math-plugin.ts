import { definePlugin, type PlainExtension } from '@prosekit/core'
import { createCursorInsidePlugin } from 'prosemirror-math'

export function defineMathPlugin(): PlainExtension {
  return definePlugin(
    createCursorInsidePlugin(),
  )
}
