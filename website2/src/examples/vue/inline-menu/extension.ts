import { defineBasicExtension } from 'prosekit/basic'

export function defineExtension() {
  return defineBasicExtension()
}

export type EditorExtension = ReturnType<typeof defineExtension>
