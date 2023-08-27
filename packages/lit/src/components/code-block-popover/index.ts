import { offset } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import { customElement, property } from 'lit/decorators.js'

import { Popover, type PopoverOptions } from '../popover'

import { CodeBlockPopoverController } from './controller'

export const propNames = ['editor'] as const

export interface CodeBlockPopoverProps {
  editor: Editor
}

@customElement('prosekit-code-block-popover')
export class CodeBlockPopover
  extends Popover
  implements Partial<CodeBlockPopoverProps>
{
  @property({ attribute: false, type: Object })
  editor?: Editor

  /** @hidden */
  private controller = new CodeBlockPopoverController(this)

  protected updated(): void {
    if (this.editor) {
      this.controller.setEditor(this.editor)
    }
    this.reference = this.controller?.reference ?? undefined
    this.active = !!this.reference
    this.options = popoverOptions
    super.updated()
  }
}

const popoverOptions: PopoverOptions = {
  placement: 'top-start',
  strategy: 'absolute',
  middleware: [
    offset((options) => {
      return -options.rects.floating.height
    }),
  ],
}
