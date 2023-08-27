import { Editor } from '@prosekit/core'
import { addCodeBlockHovering } from '@prosekit/extensions/code-block'
import { type ReactiveController, type ReactiveControllerHost } from 'lit'

export class CodeBlockMenuPopoverController implements ReactiveController {
  public reference: Element | null = null
  private editor: Editor | null = null
  private cleanup: VoidFunction | null = null

  constructor(private host: ReactiveControllerHost) {
    this.host.addController(this)
  }

  setEditor(editor: Editor) {
    if (this.editor !== editor) {
      this.editor = editor
      this.addExtension()
      this.host.requestUpdate()
    }
  }

  private addExtension() {
    const editor = this.editor
    if (!editor) return

    const extension = addCodeBlockHovering({
      onHover: ({ dom }) => {
        if (this.reference !== dom) {
          this.reference = dom 
          this.host.requestUpdate()
        }
      },
      onLeave: () => {
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
