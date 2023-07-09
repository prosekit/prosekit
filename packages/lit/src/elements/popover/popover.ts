import {
  AutoUpdateOptions,
  ComputePositionReturn,
  VirtualElement,
  autoUpdate,
  computePosition,
} from '@floating-ui/dom'
import { CSSResultGroup, LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import { roundByDPR } from '../../utils/round-by-dpr'

import { PopoverOptions } from './options'

/**
 * A custom element that displays a popover anchored to a reference element.
 */
@customElement('prosekit-popover')
export class Popover extends LitElement {
  /** @hidden */
  constructor() {
    super()
  }

  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  /**
   * Controls the visibility of the popover element. When set to `true`, the popover is displayed and positioned
   * relative to its reference element. When set to `false`, the popover is hidden and its positioning logic is
   * deactivated.
   */
  @property({ type: Boolean, reflect: true })
  active = false

  /** The floating element that displays the popover. */
  @query('.floating')
  floating!: HTMLElement

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
  @state()
  private computed?: ComputePositionReturn

  /** @hidden */
  private cleanupAutoUpdate?: VoidFunction

  /** @hidden */
  disconnectedCallback(): void {
    this.cleanup()
  }

  /** @hidden */
  protected updated(
    changed: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    if (!changed.has('computed')) {
      this.start()
    }
  }

  /** @hidden */
  private start() {
    this.cleanup()

    const reference = this.reference
    const floating = this.floating
    if (!reference) return

    if (this.autoUpdate) {
      this.cleanupAutoUpdate = autoUpdate(
        reference,
        floating,
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
    const floating = this.floating
    if (!reference) return

    const options = this.options
    this.computed = await computePosition(reference, floating, options)
  }

  /** @hidden */
  private cleanup() {
    this.cleanupAutoUpdate?.()
    this.cleanupAutoUpdate = undefined
  }

  /** @hidden */
  render() {
    const { x, y, strategy } = this.computed ?? {
      x: 0,
      y: 0,
      strategy: 'absolute',
    }

    const style = {
      top: '0',
      left: '0',
      position: strategy,
      transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
      display: this.active ? undefined : 'none',
    } satisfies Partial<CSSStyleDeclaration>

    return html`
      <div class="floating" style=${styleMap(style)}>
        <slot></slot>
      </div>
    `
  }
}
