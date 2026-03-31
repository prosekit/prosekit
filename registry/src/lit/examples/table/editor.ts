import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import '../../ui/table-handle/index'

import { ContextProvider } from '@lit/context'
import { html, LitElement, type PropertyDeclaration, type PropertyValues } from 'lit'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import type { Editor } from 'prosekit/core'
import { createEditor } from 'prosekit/core'

import { sampleContent } from '../../sample/sample-doc-table'
import { editorContext } from '../../ui/editor-context'

import { defineExtension } from './extension'

export class LitEditor extends LitElement {
  static override properties = {
    editor: { state: true, attribute: false } satisfies PropertyDeclaration<Editor>,
  }

  private editor: Editor
  private ref: Ref<HTMLDivElement>
  constructor() {
    super()

    const extension = defineExtension()
    this.editor = createEditor({ extension, defaultContent: sampleContent })
    this.ref = createRef<HTMLDivElement>()
    new ContextProvider(this, {
      context: editorContext,
      initialValue: this.editor,
    })
  }

  override createRenderRoot() {
    return this
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    this.editor.mount(this.ref.value)
  }

  override render() {
    return html`<div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div ${ref(this.ref)} class="CSS_EDITOR_CONTENT"></div>
        <lit-editor-table-handle></lit-editor-table-handle>
      </div>
    </div>`
  }
}

export function registerLitEditor() {
  if (customElements.get('lit-editor-example-table')) return
  customElements.define('lit-editor-example-table', LitEditor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-example-table': LitEditor
  }
}
