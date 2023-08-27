import '../combo-box'
import '../combo-box-input'
import '../combo-box-item'
import '../combo-box-list'
import '../popover'

import { offset } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import { customElement, property, state } from 'lit/decorators.js'
import { html } from 'lit-html'

import { BlockElement } from '../block-element'
import type { PopoverOptions } from '../popover'

import { CodeBlockMenuPopoverController } from './controller'

export const propNames = ['editor'] as const

export interface CodeBlockMenuPopoverProps {
  editor: Editor
}

@customElement('prosekit-code-block-menu-popover')
export class CodeBlockMenuPopover
  extends BlockElement
  implements Partial<CodeBlockMenuPopoverProps>
{
  @property({ attribute: false })
  editor?: Editor

  @state()
  private active = false

  @state()
  private hovering = false

  /** @hidden */
  private controller = new CodeBlockMenuPopoverController(this)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('mouseenter', () => {
      this.hovering = true
    })
    this.addEventListener('mouseleave', () => {
      this.hovering = false
    })
  }

  protected updated(): void {
    if (this.editor) {
      this.controller.setEditor(this.editor)
    }

    const active = !!this.controller?.reference || this.hovering

    if (active) {
      this.clearDeactivate()
      if (!this.active) {
        this.active = true
      }
    } else {
      if (this.active) {
        this.delayDeactivate()
      }
    }
  }

  private deactivateTimeout: ReturnType<typeof setTimeout> | null = null

  clearDeactivate(): void {
    if (this.deactivateTimeout) {
      clearTimeout(this.deactivateTimeout)
      this.deactivateTimeout = null
    }
  }

  delayDeactivate(): void {
    this.clearDeactivate()

    this.deactivateTimeout = setTimeout(() => {
      this.active = false
      this.deactivateTimeout = null
    }, DEACTIVATE_INTERVAL)
  }

  /** @hidden */
  render() {
    return html`
      <prosekit-popover
        .active=${this.active}
        .reference=${this.controller.reference ?? undefined}
        .options=${popoverOptions}
      >
        <prosekit-combo-box class="LANGUAGE_COMBO_BOX">
          <prosekit-combo-box-input
            placeholder="Language"
            class="LANGUAGE_COMBO_BOX_INPUT"
          ></prosekit-combo-box-input>
          <prosekit-combo-box-list class="LANGUAGE_COMBO_BOX_LIST">
            <prosekit-combo-box-item class="LANGUAGE_COMBO_BOX_ITEM">
              Python
            </prosekit-combo-box-item>
            <prosekit-combo-box-item class="LANGUAGE_COMBO_BOX_ITEM">
              Javascript
            </prosekit-combo-box-item>
            <prosekit-combo-box-item class="LANGUAGE_COMBO_BOX_ITEM">
              TypeScript
            </prosekit-combo-box-item>
            <prosekit-combo-box-item class="LANGUAGE_COMBO_BOX_ITEM">
              Java
            </prosekit-combo-box-item>
            <prosekit-combo-box-item class="LANGUAGE_COMBO_BOX_ITEM">
              C#
            </prosekit-combo-box-item>
          </prosekit-combo-box-list>
        </prosekit-combo-box>
      </prosekit-popover>
    `
  }
}

const popoverOptions: PopoverOptions = {
  placement: 'top-end',
  strategy: 'absolute',
  middleware: [
    offset((options) => {
      const input = (options.elements.floating as HTMLElement).querySelector(
        'prosekit-combo-box-input',
      )
      // Make sure that the prosekit-combo-box-list is not counted in the offset
      if (input) {
        const floatingRect = options.rects.floating
        const inputRect = input.getBoundingClientRect()
        return -floatingRect.height + inputRect.height
      }
      return 0
    }),
  ],
}

const DEACTIVATE_INTERVAL = 600
