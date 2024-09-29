import type {
  EmptyObject,
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'

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

export const resizableHandleProps: PropDeclarations<ResizableHandleProps> = {
  position: { default: 'bottom-right' },
}

export interface ResizableHandleEvents extends EmptyObject {}

export const resizableHandleEvents: EventDeclarations<ResizableHandleEvents> =
  {}
