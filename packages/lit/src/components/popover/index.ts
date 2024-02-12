import { type AutoUpdateOptions, type VirtualElement } from '@floating-ui/dom'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { useDismissable } from '../../controllers/use-dismissable'
import { useEffect } from '../../controllers/use-effect'
import { defineCustomElement } from '../../utils/define-custom-element'
import { popoverAvailable } from '../../utils/popover-api'
import { LightElement } from '../block-element'

import type { PositioningOptions } from './options'
import { usePopover } from './use-popover'

export type { AutoUpdateOptions, PositioningOptions }

export const popoverPropsNames = [
  'open',
  'onOpenChange',
  'reference',
  'positioning',
] as const

export { popoverPropsNames as propNames }

export interface PopoverProps {
  /**
   * Whether the popover is open.
   */
  open?: boolean

  /**
   * Function invoked when the popover opens or closes.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The element that the popover is anchored to. This can be either a DOM
   * element or an object that implements the virtual element interface from
   * Floating UI.
   */
  reference?: Element | VirtualElement

  /**
   * The user provided options used to position the popover content.
   */
  positioning?: PositioningOptions

  /**
   * A boolean that determines if the native [Web Popover
   * API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) should
   * be used. If true, the popover will be placed into the top level so that it
   * will sit on top of all other page content. This is similar to React's
   * `<Portals>` or Vue's `<Teleport>`.
   */
  elevated?: boolean
}

/**
 * A custom element that displays a popover anchored to a reference element.
 */
export class Popover extends LightElement implements Partial<PopoverProps> {
  /**
   * @hidden
   */
  static properties = {
    reference: { attribute: false },
    open: { type: Boolean, reflect: false, attribute: false },
    onOpenChange: { attribute: false },
    positioning: { type: Object, reflect: false, attribute: false },
    elevated: { type: Boolean, reflect: false, attribute: false },
  } satisfies PropertyDeclarations

  reference?: HTMLElement | VirtualElement

  open?: boolean

  onOpenChange?: ((open: boolean) => void) | undefined

  positioning?: PositioningOptions

  elevated?: boolean = true

  /**
   * @hidden
   */
  constructor() {
    super()

    useDismissable(this, {
      onPointerDownOutside: (event) => {
        this.positioning?.onPointerDownOutside?.(event)
        if (!event.defaultPrevented) {
          this.requestUpdate()
        }
      },
      onEscapeKeyDown: (event) => {
        this.positioning?.onEscapeKeyDown?.(event)
        if (!event.defaultPrevented) {
          this.requestUpdate()
        }
      },
      getReference: () => {
        return this.reference
      },
    })

    useEffect(
      this,
      () => this.open ?? false,
      (open) => this.onOpenChange?.(open),
    )

    usePopover(
      this,
      () => this.reference ?? null,
      () => this.positioning ?? null,
    )
  }

  /**
   * @hidden
   */
  connectedCallback(): void {
    super.connectedCallback()

    this.tabIndex = -1
    this.role = 'dialog'

    this.updatePopoverAttribute()
    this.updateDateAttributes()
  }

  private updatePopoverAttribute() {
    if (!popoverAvailable) {
      return
    }

    // If Popover API is available, we set the `popover` attribute to `manual`.
    // By doing this, the popover can be placed above all other elements, and
    // won't be clipped by the parent element. The result is similar to React's
    // `<Portals>` or Vue's `<Teleport>`.
    if (!this.elevated) return
    this.setAttribute('popover', 'manual')
    this.showPopover?.()
    // Override the `margin: auto` style, which breaks the positioning.
    this.style.setProperty('margin', 'unset')
  }

  private updateDateAttributes() {
    this.setAttribute('data-state', this.open ? 'open' : 'closed')
    if (this.open) {
      this.setAttribute('data-expanded', '')
    } else {
      this.removeAttribute('data-expanded')
    }
  }

  /**
   * @hidden
   */
  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    this.setHidden(!this.open)
    this.updateDateAttributes()
  }

  /**
   * @hidden
   */
  hide() {
    this.open = false
  }
}

defineCustomElement('prosekit-popover', Popover)
