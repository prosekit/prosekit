import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  defineSolidNodeView,
  type SolidNodeViewComponent,
} from 'prosekit/solid'

import CodeBlockView from './code-block-view'
import ImageView from './image-view'
import { sampleUploader } from './sample-uploader'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlockShiki(),
    defineHorizontalRule(),
    defineSolidNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies SolidNodeViewComponent,
    }),
    defineSolidNodeView({
      name: 'image',
      component: ImageView satisfies SolidNodeViewComponent,
    }),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
