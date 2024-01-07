import { clsx } from 'prosekit/core'
import { type ReactNodeViewProps } from 'prosekit/react'
import { Resizable } from 'prosekit/react/resizable'
import { ResizableHandle } from 'prosekit/react/resizable-handle'
import { useState } from 'react'

import type { ImageAttrs } from './extension'

export default function ImageView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as ImageAttrs
  const [aspectRatio, setAspectRatio] = useState<number | undefined>()

  return (
    <Resizable
      width={attrs.width ?? undefined}
      height={attrs.height ?? undefined}
      aspectRatio={aspectRatio}
      onSizeChangeEnd={(attrs) => props.setAttrs(attrs satisfies ImageAttrs)}
      className={clsx(
        'IMAGE_RESIZEALE',
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
        className="IMAGE_RESIZEALE_IMAGE"
      />
      <ResizableHandle className="IMAGE_RESIZEALE_HANDLE">
        <div className="ICON_CORNER_HANDLE"></div>
      </ResizableHandle>
    </Resizable>
  )
}
