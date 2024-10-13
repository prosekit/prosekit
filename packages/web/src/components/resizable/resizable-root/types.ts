import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'

export interface ResizableRootProps {
  width: number | null
  height: number | null
  aspectRatio: number | null
}

/** @internal */
export const resizableRootProps: PropDeclarations<ResizableRootProps> = {
  width: { default: null },
  height: { default: null },
  aspectRatio: { default: null },
}

export interface ResizableRootEvents {
  resizeStart: CustomEvent<{ width: number; height: number }>
  resizeEnd: CustomEvent<{ width: number; height: number }>
}

/** @internal */
export const resizableRootEvents: EventDeclarations<ResizableRootEvents> = {
  resizeStart: {},
  resizeEnd: {},
}
