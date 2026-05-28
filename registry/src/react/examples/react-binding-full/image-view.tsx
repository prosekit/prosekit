'use client'

import type { ReactNodeViewProps } from '@prosekit/react-binding'

export function ImageView(props: ReactNodeViewProps) {
  const width = Number(props.node.attrs.width ?? 320)
  const src = String(props.node.attrs.src ?? '')

  return (
    <figure
      className="my-4 rounded-lg border border-black/10 bg-white p-3 shadow-sm"
      data-selected={props.selected ? '' : undefined}
    >
      <img
        src={src || undefined}
        alt={String(props.node.attrs.alt ?? '')}
        width={width}
        className="block max-w-full rounded-md"
      />
      <figcaption className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
        <span>Width: {width}px</span>
        <button
          type="button"
          className="rounded border px-2 py-1 text-xs"
          onClick={() => props.setAttrs({ width: width === 320 ? 640 : 320 })}
        >
          Toggle width
        </button>
      </figcaption>
    </figure>
  )
}
