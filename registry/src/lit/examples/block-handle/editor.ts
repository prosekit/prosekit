import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import '../../ui/block-handle'
import '../../ui/drop-indicator'

import { ContextProvider } from '@lit/context'
import { html, LitElement, type PropertyDeclaration, type PropertyValues } from 'lit'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import type { Editor, NodeJSON } from 'prosekit/core'
import { createEditor } from 'prosekit/core'

import { sampleContent } from '../../sample/sample-doc-block-handle'
import { editorContext } from '../../ui/editor-context'

import { defineExtension } from './extension'

export class LitEditor extends LitElement {
  static override properties = {
    initialContent: {
      attribute: false,
    } satisfies PropertyDeclaration<NodeJSON | undefined>,
  }

  initialContent?: NodeJSON

  private editor?: Editor
  private ref: Ref<HTMLDivElement>

  constructor() {
    super()
    this.ref = createRef<HTMLDivElement>()
  }

  override createRenderRoot() {
    return this
  }

  override disconnectedCallback() {
    this.editor?.unmount()
    super.disconnectedCallback()
  }

  override willUpdate() {
    if (this.editor) {
      return
    }

    const extension = defineExtension()
    this.editor = createEditor({
      extension,
      defaultContent: this.initialContent ?? sampleContent,
    })
    new ContextProvider(this, {
      context: editorContext,
      initialValue: this.editor,
    })
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    this.editor?.mount(this.ref.value)
  }

  override render() {
    return html`<div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div ${ref(this.ref)} class="CSS_EDITOR_CONTENT"></div>
        <lit-editor-block-handle></lit-editor-block-handle>
        <lit-editor-drop-indicator></lit-editor-drop-indicator>
      </div>
    </div>`
  }
}

export function registerLitEditor() {
  if (customElements.get('lit-editor-example-block-handle')) return
  customElements.define('lit-editor-example-block-handle', LitEditor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-example-block-handle': LitEditor
  }
}
