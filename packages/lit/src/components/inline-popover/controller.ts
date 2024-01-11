import type { VirtualElement } from '@floating-ui/dom'
import { Editor, defineUpdateHandler } from '@prosekit/core'
import { trackDismissableElement } from '@zag-js/dismissable'
import type { LitElement, ReactiveController } from 'lit'

import { getVirtualSelectionElement } from './helpers'

export class InlinePopoverController implements ReactiveController {
  public reference?: VirtualElement
  private editor?: Editor
  private cleanupExtension?: VoidFunction
  private cleanupEventListener?: VoidFunction
  private interacting = false

  constructor(private host: LitElement) {
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
    const handlePointerDown = () => {
      this.interacting = true
    }

    this.host.addEventListener('pointerdown', handlePointerDown)

    const cleanupDismissable = trackDismissableElement(this.host, {
      defer: true,
      pointerBlocking: false,
      onDismiss: () => {
        this.interacting = false
      },
    })

    this.cleanupEventListener?.()
    this.cleanupEventListener = () => {
      this.host.removeEventListener('pointerdown', handlePointerDown)
      cleanupDismissable()
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

    if (!editor || this.interacting) {
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

    const extension = defineUpdateHandler(() => this.update())

    this.cleanupExtension?.()
    this.cleanupExtension = editor.use(extension)
  }
}
