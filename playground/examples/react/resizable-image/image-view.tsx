import { Themes } from '@prosekit/themes'
import { clsx } from 'prosekit/core'
import { type ReactNodeViewProps } from 'prosekit/react'
import { ResizableHandle, ResizableRoot } from 'prosekit/react/resizable'
import { useState } from 'react'

import type { ImageAttrs } from './extension'

export default function ImageView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as ImageAttrs
  const [aspectRatio, setAspectRatio] = useState<number | undefined>()

  return (
    <ResizableRoot
      width={attrs.width ?? undefined}
      height={attrs.height ?? undefined}
      aspectRatio={aspectRatio}
      onSizeChangeEnd={(attrs) => props.setAttrs(attrs satisfies ImageAttrs)}
      className={clsx(
        Themes.IMAGE_RESIZEALE,
        (!aspectRatio || aspectRatio <= 1) && 'min-h-[100px]',
        (!aspectRatio || aspectRatio >= 1) && 'min-w-[100px]',
      )}
    >
      <img
        src={attrs.src ?? ''}
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
