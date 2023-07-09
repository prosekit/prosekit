import { Editor, addBaseCommands } from '@prosekit/core'
import { PredictionRule, addSuggestion } from '@prosekit/extensions/suggestion'
import { ReactiveController, ReactiveControllerHost } from 'lit'

import { PopoverSuggestionContext } from './context'

export class PopoverSuggestionController implements ReactiveController {
  public reference: Element | null = null
  private editor: Editor | null = null
  private rules: PredictionRule[] = []
  private onContext: ((context: PopoverSuggestionContext) => void) | null = null
  private cleanup: VoidFunction | null = null

  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this)
  }

  setEditor(editor: Editor) {
    if (this.editor !== editor) {
      this.editor = editor
      this.host.requestUpdate()
      this.addExtension()
    }
  }

  setRules(rules: PredictionRule[]) {
    if (
      this.rules.length !== rules.length ||
      this.rules.some((r, i) => r !== rules[i])
    ) {
      this.rules = rules
      this.host.requestUpdate()
      this.addExtension()
    }
  }

  setOnContext(onContext: (context: PopoverSuggestionContext) => void) {
    if (this.onContext !== onContext) {
      this.onContext = onContext
      this.host.requestUpdate()
      this.addExtension()
    }
  }

  hostDisconnected() {
    this.cleanup?.()
    this.cleanup = null
  }

  private addExtension() {
    this.cleanup?.()
    this.cleanup = null

    if (!this.editor || !this.rules || this.rules.length === 0) {
      return
    }

    type BaseCommandsExtension = ReturnType<typeof addBaseCommands>
    const editor = this.editor as Editor<BaseCommandsExtension>

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

    this.cleanup = editor.use(extension)
  }
}
