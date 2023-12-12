import {
  autoUpdate,
  computePosition,
  type AutoUpdateOptions,
  type VirtualElement,
} from '@floating-ui/dom'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { popoverAvailable } from '../../utils/popover-api'
import { roundByDPR } from '../../utils/round-by-dpr'
import { LightElement } from '../block-element'

import { defaultPopoverOptions } from './default-popover-options'
import { type PopoverOptions } from './options'

export type { AutoUpdateOptions, PopoverOptions }

export const propNames = [
  'active',
  'reference',
  'options',
  'autoUpdate',
  'autoUpdateOptions',
] as const

export interface PopoverProps {
  active: boolean
  reference?: Element | VirtualElement
  options?: PopoverOptions
  autoUpdate?: boolean
  autoUpdateOptions?: AutoUpdateOptions
}

/**
 * A custom element that displays a popover anchored to a reference element.
 */
export class Popover extends LightElement implements Partial<PopoverProps> {
  /**
   * @hidden
   */
  static properties = {
    active: { type: Boolean, reflect: true },
    reference: { attribute: false },
    options: { attribute: false },
    autoUpdate: { type: Boolean, reflect: true },
    autoUpdateOptions: { type: Object },
    dismiss: { type: String, reflect: true },
  } satisfies PropertyDeclarations

  /**
   * Controls the visibility of the popover element. When set to `true`, the
   * popover is displayed and positioned relative to its reference element. When
   * set to `false`, the popover is hidden and its positioning logic is
   * deactivated.
   */
  active = false

  /**
   * The element that the popover is anchored to. This can be either a DOM
   * element or an object that implements the virtual element interface from
   * Floating UI.
   */
  reference?: Element | VirtualElement

  /**
   * The options that are passed to the `computePosition` function from Floating
   * UI. These options are used to configure the positioning of the popover
   * element relative to its reference element. For more information on the
   * available options, please refer to the Floating UI documentation.
   */
  options?: PopoverOptions

  /**
   * Controls whether the popover position is automatically updated when the
   * reference element changes position. When set to `true`, the popover
   * position is updated automatically. When set to `false`, the popover
   * position is only updated when the given properties are changed.
   *
   * @default false
   */
  autoUpdate = false

  /**
   * The options that are passed to the `autoUpdate` function from Floating UI.
   * These options are used to configure the automatic update behavior of the
   * popover position. For more information on the available options, please
   * refer to the Floating UI documentation. This property is only used when the
   * `autoUpdate` property is set to `true`.
   */
  autoUpdateOptions?: AutoUpdateOptions

  /**
   * Controls whether the popover should be dismissed based on user interaction.
   *
   * Available options:
   *
   * - "off": The popover is not dismissed.
   * - "on": The popover is dismissed when the user clicks outside of the popover or presses the escape key.
   * - "click": The popover is dismissed when the user clicks outside of the popover.
   * - "escape": The popover is dismissed when the user presses the escape key.
   *
   * @default "on"
   */
  dismiss: 'off' | 'on' | 'click' | 'escape' = 'on'

  /**
   * @hidden
   */
  private disposeAutoUpdate?: VoidFunction

  /**
   * @hidden
   */
  private disposeEventListeners?: VoidFunction

  /**
   * @hidden
   */
  connectedCallback(): void {
    super.connectedCallback()

    const clickEnabled = this.dismiss === 'on' || this.dismiss === 'click'
    const escapeEnabled = this.dismiss === 'on' || this.dismiss === 'escape'

    const handleMouseDown = clickEnabled
      ? this.handleDocumentMouseDown.bind(this)
      : null
    const handleKeyDown = escapeEnabled
      ? this.handleDocumentKeyDown.bind(this)
      : null

    handleMouseDown && document.addEventListener('mousedown', handleMouseDown)
    handleKeyDown && document.addEventListener('keydown', handleKeyDown)

    this.disposeEventListeners = () => {
      handleMouseDown &&
        document.removeEventListener('mousedown', handleMouseDown)
      handleKeyDown && document.removeEventListener('keydown', handleKeyDown)
    }
  }

  /**
   * @hidden
   */
  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.disposeAutoUpdate?.()
    this.disposeAutoUpdate = undefined

    this.disposeEventListeners?.()
    this.disposeEventListeners = undefined
  }

  /**
   * @hidden
   */
  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    if (popoverAvailable) {
      this.popover = 'manual'
      this.togglePopover?.(this.active)
    }

    this.start()
    this.setHidden(!this.active)
  }

  /**
   * @hidden
   */
  private start() {
    this.disposeAutoUpdate?.()
    this.disposeAutoUpdate = undefined

    const reference = this.reference
    if (!reference) return
    if (!this.active) return

    if (this.autoUpdate) {
      this.disposeAutoUpdate = autoUpdate(
        reference,
        this,
        () => void this.compute(),
        this.autoUpdateOptions,
      )
    } else {
      void this.compute()
    }
  }

  /**
   * @hidden
   */
  private async compute() {
    const reference = this.reference
    if (!reference) return
    if (!this.active) return

    this.setHidden(false)

    // Override default popover margin
    this.style.setProperty('margin', '0')

    this.style.setProperty('top', '0')
    this.style.setProperty('left', '0')
    this.style.setProperty('position', this.options?.strategy ?? 'absolute')

    const options: PopoverOptions = this.options ?? defaultPopoverOptions
    const computed = await computePosition(reference, this, options)

    const { x, y, strategy } = computed ?? { x: 0, y: 0, strategy: 'absolute' }
    this.style.setProperty('opacity', '1')
    this.style.setProperty('position', strategy)
    this.style.setProperty(
      'transform',
      `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
    )
  }

  /**
   * @hidden
   */
  hide() {
    this.active = false
  }

  private handleDocumentMouseDown = (event: MouseEvent) => {
    // Close when clicking outside
    const path = event.composedPath()
    if (!path.includes(this)) {
      this.hide()
    }
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Close when escape is pressed
    if (event.key === 'Escape' && this.active) {
      event.stopPropagation()
      this.hide()
      return
    }
  }
}

defineCustomElement('prosekit-popover', Popover)
