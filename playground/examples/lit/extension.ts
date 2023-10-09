import hljs from 'highlight.js/lib/common'
import { addBasicExtension } from 'prosekit/basic'
import { defineExtension } from 'prosekit/core'
import { addCodeBlock } from 'prosekit/extensions/code-block'
import { addImage } from 'prosekit/extensions/image'

export function addRootExtension() {
  return defineExtension([
    addBasicExtension(),
    addCodeBlock({ hljs }),
    addImage(),
  ])
}

export type RootExtension = ReturnType<typeof addRootExtension>
