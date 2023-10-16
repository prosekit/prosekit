import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

export function defineExampleExtension() {
  return union([defineBasicExtension()])
}

export type ExampleExtension = ReturnType<typeof defineExampleExtension>
