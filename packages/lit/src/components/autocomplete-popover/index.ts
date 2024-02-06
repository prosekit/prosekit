import { ContextProvider } from '@lit/context'
import { Editor } from '@prosekit/core'
import type { PropertyDeclarations, PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { AutocompleteList } from '../autocomplete-list/component'
import { isAutocompleteList } from '../autocomplete-list/helpers'
import { Popover, type PositioningOptions } from '../popover'

import { autocompletePopoverContext } from './context'
import { AutocompletePopoverController } from './controller'

export type { PositioningOptions }

export const propNames = ['editor', 'regex', 'positioning'] as const

export interface AutocompletePopoverProps {
  editor: Editor
  regex: RegExp
  positioning?: PositioningOptions
}

export class AutocompletePopover
  extends Popover
  implements Partial<AutocompletePopoverProps>
{
  /**
   * @hidden
   */
  private controller = new AutocompletePopoverController(
    this,
    this.updateContext.bind(this),
  )

  /**
   * @hidden
   */
  static properties = {
    ...Popover.properties,
    editor: { type: Object, reflect: false, attribute: false },
    regex: { attribute: false },
    positioning: { type: Object, reflect: false, attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor
  regex?: RegExp
  positioning?: PositioningOptions = {
    strategy: 'fixed',
    placement: 'bottom-start',
    fitViewport: true,
    flip: false,
    inline: true,
  }

  private context = new ContextProvider(this, {
    context: autocompletePopoverContext,
    initialValue: {
      active: false,
      query: '',
      handleDismiss: () => this.controller.handleDismiss?.(),
      handleSubmit: () => {
        return this.controller.handleSubmit?.()
      },
    },
  })

  private get list(): AutocompleteList | null {
    const element = this.querySelector('prosekit-autocomplete-list')
    return isAutocompleteList(element) ? element : null
  }

  private updateContext(query: string, active: boolean) {
    const context = this.context.value

    if (context.query !== query || context.active !== active) {
      this.context.setValue({ ...context, query, active })
    } else if (!active) {
      return
    }

    // Notice that even if `query` and `active` are not updated, the editor
    // state might have changed and we need to request an update to calculate
    // the new position of the popover.
    this.requestUpdate()
    requestAnimationFrame(() => {
      this.list?.selectFirstItem()
    })
  }

  /**
   * @hidden
   */
  willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties)

    if (this.editor) {
      this.controller.setEditor(this.editor)
    }
    if (this.regex) {
      this.controller.setRegex(this.regex)
    }
    this.open = !!this.controller?.reference
    this.reference = this.controller.reference ?? undefined
  }

  /**
   * @hidden
   */
  hide() {
    super.hide()

    if (this.controller?.reference) {
      this.controller.reference = null
      this.reference = undefined
    }
  }
}

defineCustomElement('prosekit-autocomplete-popover', AutocompletePopover)
