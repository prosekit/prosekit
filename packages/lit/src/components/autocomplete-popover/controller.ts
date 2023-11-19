import { Editor } from '@prosekit/core'
import {
  AutocompleteRule,
  defineAutocomplete,
  type MatchHandler,
} from '@prosekit/extensions/autocomplete'
import { type ReactiveController, type ReactiveControllerHost } from 'lit'

import { defaultQueryBuilder } from './helpers'

export class AutocompletePopoverController implements ReactiveController {
  public reference: Element | null = null
  private editor: Editor | null = null
  private regex: RegExp | null = null

  private cleanup: VoidFunction | null = null

  public handleDismiss: VoidFunction | null = null
  public handleSubmit: VoidFunction | null = null

  constructor(
    private host: ReactiveControllerHost,
    private onChange: (query: string, active: boolean) => void,
  ) {
    this.host.addController(this)
  }

  setEditor(editor: Editor) {
    if (this.editor !== editor) {
      this.editor = editor
      this.defineExtension()
      this.host.requestUpdate()
    }
  }

  setRegex(regex: RegExp) {
    if (this.regex !== regex) {
      this.regex = regex
      this.defineExtension()
      this.host.requestUpdate()
    }
  }

  private defineExtension() {
    const regex = this.regex
    const editor = this.editor

    if (!regex || !editor) {
      return
    }

    this.cleanup?.()
    this.cleanup = null

    const handleEnter: MatchHandler = (options) => {
      const span = editor.view.dom.querySelector(
        '.prosemirror-prediction-match',
      )

      if (span) {
        this.reference = span
      }

      const query: string = defaultQueryBuilder(options.match)

      this.onChange(query ?? '', !!this.reference)
      this.handleDismiss = options.ignoreMatch
      this.handleSubmit = options.deleteMatch
    }

    const handleLeave = () => {
      this.reference = null
      this.host.requestUpdate()

      this.onChange('', false)
      this.handleDismiss = null
      this.handleSubmit = null
    }

    const rule = new AutocompleteRule({
      regex: regex,
      onEnter: handleEnter,
      onLeave: handleLeave,
    })
    const extension = defineAutocomplete(rule)
    this.cleanup = editor.use(extension)
  }

  hostDisconnected() {
    this.cleanup?.()
    this.cleanup = null
  }
}
