import { Themes } from '@prosekit/themes'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { ReactNodeViewProps } from 'prosekit/react'
import { ResizableHandle, ResizableRoot } from 'prosekit/react/resizable'
import { useState, type SyntheticEvent } from 'react'

export default function ImageView(props: ReactNodeViewProps) {
  const { setAttrs, node } = props
  const attrs = node.attrs as ImageAttrs
  const url = attrs.src || ''

  const [aspectRatio, setAspectRatio] = useState<number | undefined>()

  const handleImageLoad = (event: SyntheticEvent) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      setAspectRatio(ratio)
    }
    if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) {
      setAttrs({ width: naturalWidth, height: naturalHeight })
    }
  }

  return (
    <ResizableRoot
      width={attrs.width ?? undefined}
      height={attrs.height ?? undefined}
      aspectRatio={aspectRatio}
      onResizeEnd={(event) => setAttrs(event.detail)}
      data-selected={props.selected ? '' : undefined}
      className={Themes.IMAGE_RESIZEALE}
    >
      <img
        src={url}
        onLoad={handleImageLoad}
        className={Themes.IMAGE_RESIZEALE_IMAGE}
      />

      <ResizableHandle
        className={Themes.IMAGE_RESIZEALE_HANDLE}
        position="bottom-right"
      >
        <div className={Themes.ICON_CORNER_HANDLE}></div>
      </ResizableHandle>
    </ResizableRoot>
  )
}
