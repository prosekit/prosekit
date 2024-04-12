import { Editor } from '@prosekit/core'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import {
  Popover,
  popoverPropsNames,
  type PopoverProps,
  type PositioningOptions,
} from '../popover'

import { useInlinePopover } from './use-inline-popover'

export type { PositioningOptions }

export const propNames = ['editor', 'available', ...popoverPropsNames] as const

export type InlinePopoverProps = {
  editor: Editor

  /**
   * Whether the popover is available to be shown.
   *
   * If `true`, the popover will be shown when the editor selection is not empty.
   * If `false`, the popover will always be hidden.
   *
   * @default `true`
   */
  available?: boolean
} & PopoverProps

// TODO: update
export class InlinePopover
  extends Popover
  implements Partial<InlinePopoverProps>
{
  /**
   * @hidden
   */
  static properties = {
    ...Popover.properties,
    editor: { attribute: false },
    available: { attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor

  available?: boolean = true

  positioning?: PositioningOptions = {
    strategy: 'fixed',
    placement: 'top',
    offset: 12,
    flip: false,
    hide: true,
    shift: true,
    overlap: true,
    fitViewport: true,
    inline: true,
  }

  /**
   * @hidden
   */
  constructor() {
    super()

    useInlinePopover(this, (reference) => {
      this.reference = reference
    })
  }

  /**
   * @hidden
   */
  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)

    this.open = !!(this.reference && this.available)
  }

  /**
   * @hidden
   */
  hide() {
    super.hide()

    this.reference = undefined
  }
}

defineCustomElement('prosekit-inline-popover', InlinePopover)
