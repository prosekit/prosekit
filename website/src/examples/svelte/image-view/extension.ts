import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineImageUploadHandler } from 'prosekit/extensions/image'
import {
  defineSvelteNodeView,
  type SvelteNodeViewComponent,
} from 'prosekit/svelte'

import ImageView from './image-view.svelte'
import { sampleUploader } from './sample-uploader'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineSvelteNodeView({
      name: 'image',
      component: ImageView as SvelteNodeViewComponent,
    }),
    defineImageUploadHandler({
      uploader: sampleUploader,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
