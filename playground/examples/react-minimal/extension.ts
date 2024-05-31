import { defineBaseKeymap } from 'prosekit/core'

export function defineExtension() {
  return defineBaseKeymap()
}

export type EditorExtension = ReturnType<typeof defineExtension>
