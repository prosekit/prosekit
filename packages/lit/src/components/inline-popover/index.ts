import { Editor } from '@prosekit/core'

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
    editor: { attribute: false },
    popoverOptions: { attribute: false },
  };

  editor?: Editor
  popoverOptions: PopoverOptions

  constructor() {
    super()
    this.dismiss = 'escape'
    this.popoverOptions = defaultPopoverOptions
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
