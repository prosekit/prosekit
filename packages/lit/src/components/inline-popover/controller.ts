import type { VirtualElement } from '@floating-ui/dom'
import { Editor, defineEventHandler } from '@prosekit/core'
import { type ReactiveController, type ReactiveControllerHost } from 'lit'

import { getVirtualSelectionElement } from './helpers'

export class InlinePopoverController implements ReactiveController {
  public reference?: VirtualElement
  private editor?: Editor
  private cleanupExtension?: VoidFunction
  private cleanupEventListener?: VoidFunction
  private mouseHovering = false

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

  hostConnected() {
    const handleMouseDown = () => {
      this.mouseHovering = true
    }
    const handleMouseUp = () => {
      this.mouseHovering = false
      this.update()
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    this.cleanupEventListener?.()
    this.cleanupEventListener = () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }

  hostDisconnected() {
    this.cleanupExtension?.()
    this.cleanupExtension = undefined

    this.cleanupEventListener?.()
    this.cleanupEventListener = undefined
  }

  private update() {
    const editor = this.editor

    if (!editor || this.mouseHovering) {
      return
    }

    const reference = getVirtualSelectionElement(editor.view)

    if (this.reference !== reference) {
      this.reference = reference
      this.host.requestUpdate()
    }
  }

  private defineExtension() {
    const editor = this.editor

    if (!editor) {
      return
    }

    const extension = defineEventHandler({ update: () => this.update() })

    this.cleanupExtension?.()
    this.cleanupExtension = editor.use(extension)
  }
}
