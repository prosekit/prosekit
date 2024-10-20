import { Themes } from '@prosekit/themes'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { ReactNodeViewProps } from 'prosekit/react'
import { ResizableHandle, ResizableRoot } from 'prosekit/react/resizable'
import { useState } from 'react'

export default function ImageView(props: ReactNodeViewProps) {
  const { setAttrs, node } = props
  const { width, height, src } = node.attrs as ImageAttrs
  const url = src || ''

  const [aspectRatio, setAspectRatio] = useState<number | undefined>()

  return (
    <ResizableRoot
      width={width ?? undefined}
      height={height ?? undefined}
      aspectRatio={aspectRatio}
      onResizeEnd={(event) => setAttrs(event.detail)}
      data-selected={props.selected ? '' : undefined}
      className={Themes.IMAGE_RESIZEALE}
    >
      <img
        src={url}
        onLoad={(event) => {
          const img = event.target as HTMLImageElement
          const aspectRatio = img.naturalWidth / img.naturalHeight
          if (aspectRatio && Number.isFinite(aspectRatio)) {
            setAspectRatio(aspectRatio)
          }
        }}
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
