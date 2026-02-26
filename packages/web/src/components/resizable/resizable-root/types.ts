import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'

import { isFinitePositiveNumber } from '../../../utils/is-finite-positive-number.ts'

export interface ResizableRootProps {
  width: number | null
  height: number | null
  aspectRatio: number | null
}

function fromNumberAttribute(value: string | null): number | null {
  if (typeof value === 'string') {
    const number = Number.parseFloat(value)
    if (isFinitePositiveNumber(number)) {
      return number
    }
  }
  return null
}

function toNumberAttribute(value: number | null): string | null {
  if (typeof value === 'number') {
    return `${value}`
  }
  return null
}

/** @internal */
export const resizableRootProps: PropDeclarations<ResizableRootProps> = {
  width: {
    default: null,
    attribute: 'data-width',
    fromAttribute: fromNumberAttribute,
    toAttribute: toNumberAttribute,
  },
  height: {
    default: null,
    attribute: 'data-height',
    fromAttribute: fromNumberAttribute,
    toAttribute: toNumberAttribute,
  },
  aspectRatio: {
    default: null,
    attribute: 'data-aspect-ratio',
    fromAttribute: fromNumberAttribute,
    toAttribute: toNumberAttribute,
  },
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
