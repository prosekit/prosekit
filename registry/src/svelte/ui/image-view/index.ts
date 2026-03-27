import type { Extension } from 'prosekit/core'
import { defineSvelteNodeView, type SvelteNodeViewComponent } from 'prosekit/svelte'

import ImageView from './image-view.svelte'

export function defineImageView(): Extension {
  return defineSvelteNodeView({
    name: 'image',
    component: ImageView as SvelteNodeViewComponent,
  })
}
