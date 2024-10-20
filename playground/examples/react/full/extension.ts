import { defineBasicExtension } from 'prosekit/basic'
import { defineNodeAttr, insertNode, union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import {
  defineFileDropHandler,
  defineFilePasteHandler,
  UploadTask,
} from 'prosekit/extensions/file'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  defineReactNodeView,
  type ReactNodeViewComponent,
} from 'prosekit/react'

import CodeBlockView from './code-block-view'
import ImageView from './image-view'
import { tmpfilesUploader } from './upload-file'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineHorizontalRule(),
    defineReactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies ReactNodeViewComponent,
    }),
    defineReactNodeView({
      name: 'image',
      component: ImageView satisfies ReactNodeViewComponent,
    }),
    defineFilePasteHandler(({ view, file }) => {
      if (!file.type.startsWith('image/')) {
        return false
      }
      const uploadTask = new UploadTask({
        file,
        uploader: tmpfilesUploader,
      })
      const command = insertNode({
        type: 'image',
        attrs: { src: uploadTask.objectURL },
      })
      return command(view.state, view.dispatch, view)
    }),
    defineFileDropHandler(({ view, file, pos }) => {
      if (!file.type.startsWith('image/')) {
        return false
      }
      const uploadTask = new UploadTask({
        file,
        uploader: tmpfilesUploader,
      })
      const command = insertNode({
        type: 'image',
        attrs: { src: uploadTask.objectURL },
        pos,
      })
      return command(view.state, view.dispatch, view)
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
