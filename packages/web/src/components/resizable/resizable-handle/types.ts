import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'

export interface ResizableHandleProps {
  /**
   * The position of the handle.
   *
   * @default "bottom-right"
   */
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
}

/** @internal */
export const resizableHandleProps: PropDeclarations<ResizableHandleProps> = {
  position: { default: 'bottom-right' },
}

/** @internal */
export interface ResizableHandleEvents {}

/** @internal */
export const resizableHandleEvents: EventDeclarations<ResizableHandleEvents> = {}
