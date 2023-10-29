import '../popover'

import { provide } from '@lit/context'
import { Editor } from '@prosekit/core'
import { customElement, property, query, state } from 'lit/decorators.js'

import { AutocompleteList } from '../autocomplete-list/component'
import { isAutocompleteList } from '../autocomplete-list/helpers'
import { Popover } from '../popover'
import { type PopoverOptions } from '../popover/options'

import {
  commandPopoverContext,
  type AutocompletePopoverContext,
} from './context'
import { AutocompletePopoverController } from './controller'
import { defaultPopoverOptions } from './default-popover-options'

export { type PopoverOptions }

export const propNames = ['editor', 'regex', 'popoverOptions'] as const

export interface AutocompletePopoverProps {
  editor: Editor
  regex: RegExp
  popoverOptions?: PopoverOptions
}

@customElement('prosekit-autocomplete-popover')
export class AutocompletePopover
  extends Popover
  implements Partial<AutocompletePopoverProps>
{
  /** @hidden */
  private controller = new AutocompletePopoverController(
    this,
    this.updateContext.bind(this),
  )

  @property({ attribute: false })
  editor?: Editor

  @property({ attribute: false })
  regex?: RegExp

  @property({ attribute: false })
  popoverOptions: PopoverOptions = defaultPopoverOptions

  @provide({ context: commandPopoverContext })
  @state()
  context: AutocompletePopoverContext = {
    active: false,
    query: '',
    handleDismiss: () => this.controller.handleDismiss?.(),
    handleSubmit: () => {
      return this.controller.handleSubmit?.()
    },
  }

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  private get list(): AutocompleteList | null {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.find(isAutocompleteList) ?? null
    )
  }

  private updateContext(query: string, active: boolean) {
    if (this.context.query === query && this.context.active === active) {
      return
    }

    this.context = { ...this.context, query, active }
    requestAnimationFrame(() => {
      this.list?.selectFirstItem()
    })
  }

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  /** @hidden */
  willUpdate(): void {
    if (this.editor) {
      this.controller.setEditor(this.editor)
    }
    if (this.regex) {
      this.controller.setRegex(this.regex)
    }
    this.active = !!this.controller?.reference
    this.reference = this.controller.reference ?? undefined
    this.options = this.popoverOptions
  }
}
