import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'

export interface ResizableRootProps {
  width: number | null
  height: number | null
  aspectRatio: number | null

  // TODO: move them into ResizableRootEvents

  onSizeChangeStart: ((size: { width: number; height: number }) => void) | null
  onSizeChange: ((size: { width: number; height: number }) => void) | null
  onSizeChangeEnd: ((size: { width: number; height: number }) => void) | null
}

export const resizableRootProps: PropDeclarations<ResizableRootProps> = {
  width: { default: null },
  height: { default: null },
  aspectRatio: { default: null },
  onSizeChangeStart: { default: null },
  onSizeChange: { default: null },
  onSizeChangeEnd: { default: null },
}

export interface ResizableRootEvents {}

export const resizableRootEvents: EventDeclarations<ResizableRootEvents> = {}
