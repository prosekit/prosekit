import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  definePreactNodeView,
  type PreactNodeViewComponent,
} from 'prosekit/preact'

import CodeBlockView from './code-block-view'
import ImageView from './image-view'
import { sampleUploader } from './sample-uploader'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineHorizontalRule(),
    definePreactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies PreactNodeViewComponent,
    }),
    definePreactNodeView({
      name: 'image',
      component: ImageView satisfies PreactNodeViewComponent,
    }),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
