import {
  autoUpdate,
  computePosition,
  type AutoUpdateOptions,
  type VirtualElement,
} from '@floating-ui/dom'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
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
  static properties = {
    active: { type: Boolean, reflect: true },
    reference: { attribute: false },
    options: { attribute: false },
    autoUpdate: { type: Boolean, reflect: true },
    autoUpdateOptions: { type: Object },
    dismiss: { type: String, reflect: true },
  } satisfies PropertyDeclarations

  active = false
  reference?: Element | VirtualElement
  options?: PopoverOptions
  autoUpdate = false
  autoUpdateOptions?: AutoUpdateOptions
  dismiss = 'on'

  /** @hidden */
  constructor() {
    super()
  }

  /** @hidden */
  private disposeAutoUpdate?: VoidFunction

  /** @hidden */
  private disposeEventListeners?: VoidFunction

  /** @hidden */
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

  /** @hidden */
  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.disposeAutoUpdate?.()
    this.disposeAutoUpdate = undefined

    this.disposeEventListeners?.()
    this.disposeEventListeners = undefined
  }

  /** @hidden */
  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    this.start()
    this.setHidden(!this.active)
  }

  /** @hidden */
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

  /** @hidden */
  private async compute() {
    const reference = this.reference
    if (!reference) return
    if (!this.active) return

    this.setHidden(false)

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

  /** @hidden */
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
