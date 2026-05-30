'use client'

import type { HTMLAttributes, ReactNode, Ref } from 'react'

import { nextAsyncSeed, readAsyncEmoji } from './async-resource.ts'

interface AsyncBlockViewContentProps {
  dataView: string
  description: string
  emoji: ReactNode
  label: string
  seed: string
  setSeed: (seed: string) => void
  testId: string
  /**
   * Forwarded from the react-binding node view so react-prosemirror can track
   * the node's outermost DOM element. Undefined for the `prosekit/react`
   * version, where ProseMirror owns the DOM directly.
   */
  viewRef?: Ref<HTMLDivElement>
  /**
   * DOM attributes injected by react-prosemirror (e.g. `contentEditable`).
   */
  domProps?: HTMLAttributes<HTMLDivElement>
}

export function EmojiContent(props: { seed: string }) {
  const emoji = readAsyncEmoji(props.seed)
  return <span className="text-5xl leading-none">{emoji}</span>
}

export function AsyncBlockViewContent(props: AsyncBlockViewContentProps) {
  const { className: injectedClassName, ...restDomProps } = props.domProps ?? {}

  return (
    <div
      {...restDomProps}
      ref={props.viewRef}
      data-async-block-view={props.dataView}
      className={['my-4 flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm', injectedClassName]
        .filter(Boolean)
        .join(' ')}
      contentEditable={false}
      suppressContentEditableWarning
      onMouseDown={(event) => {
        event.stopPropagation()
      }}
    >
      <span className="text-sm font-medium">{props.label}</span>
      <div className="flex items-center gap-4">
        {props.emoji}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="text-sm text-neutral-700">
            {props.description}
          </span>
          <button
            data-testid={props.testId}
            className="w-fit rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50"
            onClick={() => {
              props.setSeed(nextAsyncSeed(props.seed))
            }}
            type="button"
          >
            Load next seed
          </button>
          <span className="text-xs text-neutral-500">
            Current seed: {props.seed}
          </span>
        </div>
      </div>
    </div>
  )
}
