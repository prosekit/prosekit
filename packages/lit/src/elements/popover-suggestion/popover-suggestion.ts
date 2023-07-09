import { Editor } from '@prosekit/core'
import { PredictionRule } from '@prosekit/extensions/suggestion'
import { CSSResultGroup, html, LitElement } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import { isMenu } from '../../utils/is-menu'
import { Menu } from '../menu'
import { PopoverOptions } from '../popover'

import { PopoverSuggestionContext } from './context'
import { PopoverSuggestionController } from './controller'
import { defaultPopoverOptions } from './options'

import '../popover'

export { type PopoverSuggestionContext, type PredictionRule }

@customElement('prosekit-popover-suggestion')
export class PopoverSuggestion extends LitElement {
  /** @hidden */
  constructor() {
    super()
  }

  @property({ attribute: false })
  editor!: Editor

  @property({ attribute: false })
  popoverOptions: PopoverOptions = defaultPopoverOptions

  @property({ attribute: false })
  rules!: PredictionRule[]

  /** @hidden */
  @state()
  context: PopoverSuggestionContext = { active: false }

  @property({ attribute: false })
  onContext?: (context: PopoverSuggestionContext) => void

  /** @hidden */
  @state()
  controller?: PopoverSuggestionController

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  /** @hidden */
  protected firstUpdated(): void {
    setTimeout(() => {
      this.controller = new PopoverSuggestionController(
        this,
        this.editor,
        this.rules,
        (context) => {
          this.onContext?.(context)
          this.context = context
          requestAnimationFrame(() => {
            this.queryMenu()?.ensureFocusedItem?.()
          })
        },
      )
    })
  }

  /** @hidden */
  protected get active(): boolean {
    return !!this.controller?.reference
  }

  /** @hidden */
  private queryMenu(): Menu | null {
    return (
      this.defaultSlot?.assignedElements({ flatten: true })?.find(isMenu) ??
      null
    )
  }

  /** @hidden */
  render() {
    return html`
      <prosekit-popover
        .active=${this.active}
        .reference=${this.controller?.reference ?? undefined}
        .options=${this.popoverOptions}
      >
        <slot
          @menu-dismiss=${() => this.context?.onDismiss?.()}
          @menu-select=${() => this.context?.onSubmit?.()}
        ></slot>
      </prosekit-popover>
    `
  }
}
