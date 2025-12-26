import type { ImageAttrs } from 'prosekit/extensions/image'
import type { ReactNodeViewProps } from 'prosekit/react'

import ImageViewContent from './image-view-content'
import ImageViewPlaceholder from './image-view-placeholder'

export default function ImageView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as ImageAttrs
  const url = attrs.src || ''

  if (url) {
    return <ImageViewContent {...props} />
  } else {
    return <ImageViewPlaceholder getPos={props.getPos} selected={props.selected} />
  }
}
