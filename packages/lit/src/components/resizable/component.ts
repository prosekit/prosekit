import { ContextProvider } from '@lit/context'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'

import { resizableContext } from './context'

/**
 * @internal
 */
export const propNames = ['width', 'height', 'onResize', 'onResizeEnd'] as const

/**
 * @public
 */
export interface ResizableProps {
  width?: string | number

  height?: string | number

  aspectRatio?: number

  onSizeChangeStart?: (size: { width: number; height: number }) => void

  onSizeChange?: (size: { width: number; height: number }) => void | {
    width?: number | string
    height?: number | string
  }

  onSizeChangeEnd?: (size: { width: number; height: number }) => void
}

/**
 * @public
 */
export class Resizable extends LightElement implements Partial<ResizableProps> {
  /**
   * @hidden
   */
  static properties = {
    width: { attribute: false },
    height: { attribute: false },
    aspectRatio: { attribute: false },
    onResize: { attribute: false },
    onResizeEnd: { attribute: false },
  } satisfies PropertyDeclarations

  width?: number | string

  height?: number | string

  aspectRatio?: number

  onSizeChangeStart?: (size: { width: number; height: number }) => void

  onSizeChange?: (size: { width: number; height: number }) => void | {
    width?: number | string
    height?: number | string
  }

  onSizeChangeEnd?: (size: { width: number; height: number }) => void

  private context = new ContextProvider(this, {
    context: resizableContext,
    initialValue: {
      onResizeStart: () => this.handleResizeStart(),
      onResize: (w, h) => this.handleResize(w, h),
      onResizeEnd: () => this.handleResizeEnd(),
    },
  })

  private startWidth = 0
  private startHeight = 0

  private handleResizeStart() {
    const { width, height } = this.getBoundingClientRect()
    this.startWidth = width
    this.startHeight = height
    this.onSizeChangeStart?.({ width, height })
    return [width, height, this.aspectRatio ?? width / height] as const
  }

  private handleResize(width: number, height: number) {
    const output = this.onSizeChange?.({ width, height })
    this.width = output?.width ?? width
    this.height = output?.height ?? height
  }

  private handleResizeEnd() {
    const { width, height } = this.getBoundingClientRect()
    this.onSizeChangeEnd?.({ width, height })
  }

  private updateStyle() {
    const w = this.width
    const h = this.height
    const r = this.aspectRatio

    if (w != null && w !== '' && Number.isFinite(w)) {
      this.style.width = typeof w === 'number' ? `${w}px` : w
    } else {
      this.style.width = ''
    }

    if (h != null && h !== '' && Number.isFinite(h)) {
      this.style.height = typeof h === 'number' ? `${h}px` : h
    } else {
      this.style.height = ''
    }

    if (r && Number.isFinite(r)) {
      this.style.aspectRatio = `${r}`

      if (this.style.width && this.startWidth >= this.startHeight && r >= 1) {
        this.style.height = 'auto'
      } else if (
        this.style.height &&
        this.startWidth <= this.startHeight &&
        r <= 1
      ) {
        this.style.width = 'auto'
      }
    }
  }

  /**
   * @hidden
   */
  connectedCallback(): void {
    super.connectedCallback()
    this.updateStyle()
  }

  /**
   * @hidden
   */
  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)
    this.updateStyle()
  }
}

defineCustomElement('prosekit-resizable', Resizable)
