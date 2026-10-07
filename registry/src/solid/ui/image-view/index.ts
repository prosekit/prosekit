import type { Extension } from 'prosekit/core'
import { defineSolidNodeView, type SolidNodeViewComponent } from 'prosekit/solid'

import ImageView from './image-view.tsx'

export function defineImageView(): Extension {
  return defineSolidNodeView({
    name: 'image',
    component: ImageView satisfies SolidNodeViewComponent,
  })
}
