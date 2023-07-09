import { Editor, ProseKitError, addBaseCommands } from '@prosekit/core'
import { PredictionRule, addSuggestion } from '@prosekit/extensions/suggestion'
import { ReactiveController, ReactiveControllerHost } from 'lit'

import { PopoverSuggestionContext } from './context'

export class PopoverSuggestionController implements ReactiveController {
  private connected = false
  public reference: Element | null = null
  private removeExtension: VoidFunction | null = null

  constructor(
    private host: ReactiveControllerHost,
    private editor: Editor,
    private rules: PredictionRule[],
    private onContext?: (context: PopoverSuggestionContext) => void,
  ) {
    if (!editor) {
      throw new ProseKitError("Missing 'editor' property")
    }
    if (!rules) {
      throw new ProseKitError("Missing 'rules' property")
    }

    this.host.addController(this)
  }

  hostUpdated(): void {
    if (this.connected) return
    this.connected = true

    type BaseCommandsExtension = ReturnType<typeof addBaseCommands>
    const editor = this.editor as Editor<BaseCommandsExtension>
    if (!editor) {
      throw new ProseKitError("Missing 'editor' property")
    }
    if (!this.rules) {
      throw new ProseKitError("Missing 'rules' property")
    }

    const extension = addSuggestion({
      rules: this.rules,
      onMatch: ({ dismiss, deleteMatch, match, matchAfter }) => {
        const span = editor.view.dom.querySelector(
          '.prosemirror-prediction-match',
        )
        if (span) {
          this.reference = span
        }

        const matchText = match[0] + (matchAfter?.[0] ?? '')

        this.onContext?.({
          active: true,
          query: matchText,
          onDismiss: () => {
            dismiss()
          },
          onSubmit: () => {
            deleteMatch()
          },
        })
      },
      onDeactivate: () => {
        this.reference = null
        setTimeout(() => {
          this.onContext?.({
            active: false,
          })
        })
      },
    })

    this.removeExtension?.()
    this.removeExtension = editor.use(extension)
  }

  hostDisconnected() {
    this.connected = false
    this.removeExtension?.()
    this.removeExtension = null
  }
}
