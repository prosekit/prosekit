import { ContextProvider } from '@lit/context'
import { Editor } from '@prosekit/core'
import type { PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'

import { defineCustomElement } from '../../utils/define-custom-element'
import { AutocompleteList } from '../autocomplete-list/component'
import { isAutocompleteList } from '../autocomplete-list/helpers'
import { Popover } from '../popover'
import { type PopoverOptions } from '../popover/options'

import { commandPopoverContext } from './context'
import { AutocompletePopoverController } from './controller'
import { defaultPopoverOptions } from './default-popover-options'

export { type PopoverOptions }

export const propNames = ['editor', 'regex', 'popoverOptions'] as const

export interface AutocompletePopoverProps {
  editor: Editor
  regex: RegExp
  popoverOptions?: PopoverOptions
}

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

  private context = new ContextProvider(this, {
    context: commandPopoverContext,
    initialValue: {
      active: false,
      query: '',
      handleDismiss: () => this.controller.handleDismiss?.(),
      handleSubmit: () => {
        return this.controller.handleSubmit?.()
      },
    },
  })

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  private get list(): AutocompleteList | null {
    const element = this.querySelector('prosekit-autocomplete-list')
    return isAutocompleteList(element) ? element : null
  }

  private updateContext(query: string, active: boolean) {
    const context = this.context.value

    if (context.query === query && context.active === active) {
      return
    }

    this.context.setValue({ ...context, query, active })
    requestAnimationFrame(() => {
      this.list?.selectFirstItem()
    })
  }

  /** @hidden */
  willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties)

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

  /** @hidden */
  hide() {
    super.hide()

    if (this.controller?.reference) {
      this.controller.reference = null
      this.reference = undefined
    }
  }
}

defineCustomElement('prosekit-autocomplete-popover', AutocompletePopover)
