import { addBasicExtension } from 'prosekit/basic'
import { defineExtension } from 'prosekit/core'

export function addExampleExtension() {
  return defineExtension([addBasicExtension()])
}

export type ExampleExtension = ReturnType<typeof addExampleExtension>
