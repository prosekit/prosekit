import hljs from 'highlight.js/lib/common'
import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlock } from 'prosekit/extensions/code-block'
import { defineImage } from 'prosekit/extensions/image'

export function defineRootExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock({ hljs }),
    defineImage(),
  ])
}

export type RootExtension = ReturnType<typeof defineRootExtension>
