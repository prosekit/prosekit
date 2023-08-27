// @unocss-include

import 'highlight.js/styles/github-dark-dimmed.css'
import 'prosekit/basic/internal/example.css'
import 'prosekit/basic/style.css'

import hljs from 'highlight.js/lib/common'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import { createEditor, type Editor } from 'prosekit/core'
import { Slice, Fragment } from 'prosekit/pm/model'

import { addRootExtension, type RootExtension } from './extension'
import './language-selector'

@customElement('my-editor')
export class MyEditor extends LitElement {
  createRenderRoot() {
    return this
  }

  @state()
  editor?: Editor<RootExtension>

  private editorRef: Ref<HTMLDivElement> = createRef()

  protected firstUpdated(): void {
    if (!this.editor) {
      const extension = addRootExtension()
      this.editor = createEditor({ extension })
    }

    this.editor.mount(this.editorRef.value)

    insertContent(this.editor)
  }

  render() {
    return html`
      <div class="example-editor EDITOR_BOX">
        <div ${ref(this.editorRef)}></div>
        <my-language-selector
          .hljs=${hljs}
          .editor=${this.editor}
        ></my-language-selector>
      </div>
    `
  }
}

function insertContent(editor: Editor) {
  const tr = editor.view.state.tr

  const json = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 1,
        },
        content: [
          {
            type: 'text',
            text: 'Code Block',
          },
        ],
      },
      {
        type: 'codeBlock',
        attrs: {
          language: 'python',
        },
        content: [
          {
            type: 'text',
            text: 'if __name__ == "__main__":\n    print("hello world!")\n\n'.repeat(
              20,
            ),
          },
        ],
      },
    ],
  }

  const doc = editor.schema.nodeFromJSON(json)
  const slice = new Slice(Fragment.from(doc), 0, 0)

  tr.replace(0, tr.doc.content.size, slice)

  editor.view.dispatch(tr)
}
