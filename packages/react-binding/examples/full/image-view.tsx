'use client'

import type { ReactNodeViewProps } from '@prosekit/react-binding'

export function ImageView(props: ReactNodeViewProps) {
  const width = Number(props.node.attrs.width ?? 320)
  const src = String(props.node.attrs.src ?? '')

  return (
    <figure data-selected={props.selected ? '' : undefined}>
      <img
        src={src || undefined}
        alt={String(props.node.attrs.alt ?? '')}
        width={width}
      />
      <figcaption>
        <button
          type="button"
          onClick={() => props.setAttrs({ width: width === 320 ? 640 : 320 })}
        >
          Toggle width
        </button>
      </figcaption>
    </figure>
  )
}
