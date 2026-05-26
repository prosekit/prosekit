import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCallout } from 'prosekit/extensions/callout'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineTextColor } from 'prosekit/extensions/text-color'

import { sampleUploader } from '../../sample/sample-uploader.ts'
import { defineCodeBlockView } from '../../ui/code-block-view/index.ts'

import { defineImageView } from './image-view/index.ts'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlockShiki(),
    defineCallout(),
    defineHorizontalRule(),
    defineCodeBlockView(),
    defineImageView(),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
    defineTextColor(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
