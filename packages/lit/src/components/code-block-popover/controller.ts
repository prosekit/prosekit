import { Editor } from '@prosekit/core'
import { type ReactiveController, type ReactiveControllerHost } from 'lit'

import { defineCodeBlockSelect } from './code-block-select'

export class CodeBlockPopoverController implements ReactiveController {
  public reference: Element | null = null
  private editor: Editor | null = null
  private cleanup: VoidFunction | null = null

  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this)
  }

  setEditor(editor: Editor) {
    if (this.editor !== editor) {
      this.editor = editor
      this.defineExtension()
      this.host.requestUpdate()
    }
  }

  private defineExtension() {
    const editor = this.editor
    if (!editor) return

    const extension = defineCodeBlockSelect({
      onSelect: ({ dom }) => {
        if (this.reference !== dom) {
          this.reference = dom
          this.host.requestUpdate()
        }
      },
      onDismiss: () => {
        if (this.reference !== null) {
          this.reference = null
          this.host.requestUpdate()
        }
      },
    })

    this.cleanup?.()
    this.cleanup = editor.use(extension)
  }

  hostDisconnected() {
    this.cleanup?.()
    this.cleanup = null
  }
}
