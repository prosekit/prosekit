import { Editor } from '@prosekit/core'
import type { PropertyDeclarations } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { Popover } from '../popover'
import { type PopoverOptions } from '../popover/options'

import { InlinePopoverController } from './controller'
import { defaultPopoverOptions } from './default-popover-options'

export { type PopoverOptions }

export const propNames = ['editor', 'popoverOptions'] as const

export interface InlinePopoverProps {
  editor: Editor
  popoverOptions?: PopoverOptions
}

export class InlinePopover
  extends Popover
  implements Partial<InlinePopoverProps>
{
  /** @hidden */
  private controller = new InlinePopoverController(this)

  static properties = {
    ...Popover.properties,
    editor: { attribute: false },
    popoverOptions: { attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor
  popoverOptions: PopoverOptions = defaultPopoverOptions

  constructor() {
    super()
    this.dismiss = 'escape'
  }

  /** @hidden */
  willUpdate(): void {
    if (this.editor) {
      this.controller.setEditor(this.editor)
    }
    this.active = !!this.controller?.reference
    this.reference = this.controller.reference ?? undefined
    this.options = this.popoverOptions
  }

  /** @hidden */
  hide() {
    super.hide()

    if (this.controller?.reference) {
      this.controller.reference = undefined
      this.reference = undefined
    }
  }
}

defineCustomElement('prosekit-inline-popover', InlinePopover)
