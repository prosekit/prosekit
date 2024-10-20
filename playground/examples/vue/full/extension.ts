import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import CodeBlockView from './code-block-view.vue'
import ImageView from './image-view.vue'
import { defineImageFileHandlers } from './upload-file'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineHorizontalRule(),
    defineVueNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView as VueNodeViewComponent,
    }),
    defineVueNodeView({
      name: 'image',
      component: ImageView as VueNodeViewComponent,
    }),
    defineImageFileHandlers(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
