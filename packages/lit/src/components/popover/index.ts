import {
  autoUpdate,
  computePosition,
  type AutoUpdateOptions,
  type VirtualElement,
} from '@floating-ui/dom'
import { customElement, property } from 'lit/decorators.js'

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
@customElement('prosekit-popover')
export class Popover extends LightElement implements Partial<PopoverProps> {
  /** @hidden */
  constructor() {
    super()
  }

  /**
   * Controls the visibility of the popover element. When set to `true`, the popover is displayed and positioned
   * relative to its reference element. When set to `false`, the popover is hidden and its positioning logic is
   * deactivated.
   */
  @property({ type: Boolean, reflect: true })
  active = false

  /**
   * The element that the popover is anchored to. This can be either a DOM element or an object that implements the
   * virtual element interface from Floating UI.
   */
  @property({ attribute: false })
  reference?: Element | VirtualElement

  /**
   * The options that are passed to the `computePosition` function from Floating UI. These options are used to
   * configure the positioning of the popover element relative to its reference element. For more information on the
   * available options, please refer to the Floating UI documentation.
   */
  @property({ attribute: false })
  options?: PopoverOptions

  /**
   * Controls whether the popover position is automatically updated when the reference element changes position. When
   * set to `true`, the popover position is updated automatically. When set to `false`, the popover position is only
   * updated when the given properties are changed.
   *
   * @default false
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  autoUpdate = false

  /**
   * The options that are passed to the `autoUpdate` function from Floating UI. These options are used to configure the
   * automatic update behavior of the popover position. For more information on the available options, please refer to
   * the Floating UI documentation. This property is only used when the `autoUpdate` property is set to `true`.
   */
  @property({ type: Object })
  autoUpdateOptions?: AutoUpdateOptions

  /** @hidden */
  private cleanupAutoUpdate?: VoidFunction

  /** @hidden */
  disconnectedCallback(): void {
    this.cleanup()
  }

  /** @hidden */
  protected updated(): void {
    this.start()
    this.setHidden(!this.active)
  }

  /** @hidden */
  private start() {
    this.cleanup()

    const reference = this.reference
    if (!reference) return
    if (!this.active) return

    if (this.autoUpdate) {
      this.cleanupAutoUpdate = autoUpdate(
        reference,
        this,
        () => void this.compute(),
        this.autoUpdateOptions,
      )
    } else {
      void this.compute()
    }
  }

  /** @hidden */
  private async compute() {
    const reference = this.reference
    if (!reference) return
    if (!this.active) return

    this.setHidden(false)
    this.style.position = this.options?.strategy ?? 'absolute'

    const options: PopoverOptions = this.options ?? defaultPopoverOptions
    const computed = await computePosition(reference, this, options)

    const { x, y, strategy } = computed ?? { x: 0, y: 0, strategy: 'absolute' }

    this.style.top = '0'
    this.style.left = '0'
    this.style.position = strategy
    this.style.transform = `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`
  }

  /** @hidden */
  private cleanup() {
    this.cleanupAutoUpdate?.()
    this.cleanupAutoUpdate = undefined
  }
}
