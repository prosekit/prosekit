import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  html,
  LitElement,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit'
import {
  createRef,
  ref,
  type Ref,
} from 'lit/directives/ref.js'
import { defineBasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { createEditor } from 'prosekit/core'

import '../../ui/slash-menu/index'

export class LitEditor extends LitElement {
  static override properties = {
    editor: { state: true, attribute: false } satisfies PropertyDeclaration<Editor>,
  }

  private editor: Editor
  private ref: Ref<HTMLDivElement>

  constructor() {
    super()

    const extension = defineBasicExtension()
    this.editor = createEditor({ extension })
    this.ref = createRef<HTMLDivElement>()
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
        <lit-editor-slash-menu .editor=${this.editor}></lit-editor-slash-menu>
    </div>
    </div>`
  }
}

export function registerLitEditor() {
  if (customElements.get('lit-editor-example-slash-menu')) return
  customElements.define('lit-editor-example-slash-menu', LitEditor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-example-slash-menu': LitEditor
  }
}
