import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { ContextProvider } from '@lit/context'
import { html, LitElement, type PropertyDeclaration, type PropertyValues } from 'lit'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import type { Editor, NodeJSON } from 'prosekit/core'
import { createEditor } from 'prosekit/core'

import { sampleContent } from '../../sample/sample-doc-full.ts'
import { tags } from '../../sample/sample-tag-data.ts'
import { sampleUploader } from '../../sample/sample-uploader.ts'
import { users } from '../../sample/sample-user-data.ts'
import { registerLitEditorBlockHandle } from '../../ui/block-handle/index.ts'
import { registerLitEditorDropIndicator } from '../../ui/drop-indicator/index.ts'
import { editorContext } from '../../ui/editor-context.ts'
import { registerLitEditorInlineMenu } from '../../ui/inline-menu/index.ts'
import { registerLitEditorSlashMenu } from '../../ui/slash-menu/index.ts'
import { registerLitEditorTableHandle } from '../../ui/table-handle/index.ts'
import { registerLitEditorTagMenu } from '../../ui/tag-menu/index.ts'
import { registerLitEditorToolbar } from '../../ui/toolbar/index.ts'
import { registerLitEditorUserMenu } from '../../ui/user-menu/index.ts'

import { defineExtension } from './extension.ts'

export class LitEditor extends LitElement {
  static override properties = {
    initialContent: { attribute: false } satisfies PropertyDeclaration<NodeJSON | undefined>,
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
      <lit-editor-toolbar .uploader=${sampleUploader}></lit-editor-toolbar>
      <div class="CSS_EDITOR_SCROLLING">
        <div ${ref(this.ref)} class="CSS_EDITOR_CONTENT"></div>
        <lit-editor-inline-menu style="display: contents;"></lit-editor-inline-menu>
        <lit-editor-slash-menu style="display: contents;"></lit-editor-slash-menu>
        <lit-editor-user-menu style="display: contents;" .users=${users}></lit-editor-user-menu>
        <lit-editor-tag-menu style="display: contents;" .tags=${tags}></lit-editor-tag-menu>
        <lit-editor-block-handle></lit-editor-block-handle>
        <lit-editor-table-handle></lit-editor-table-handle>
        <lit-editor-drop-indicator></lit-editor-drop-indicator>
      </div>
    </div>`
  }
}

export function registerLitEditor() {
  registerLitEditorToolbar()
  registerLitEditorInlineMenu()
  registerLitEditorSlashMenu()
  registerLitEditorUserMenu()
  registerLitEditorTagMenu()
  registerLitEditorBlockHandle()
  registerLitEditorTableHandle()
  registerLitEditorDropIndicator()

  if (customElements.get('lit-editor-example-full')) return
  customElements.define('lit-editor-example-full', LitEditor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-example-full': LitEditor
  }
}
