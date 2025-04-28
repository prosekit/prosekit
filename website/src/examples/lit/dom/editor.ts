import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  html,
  LitElement,
} from 'lit'
import {
  customElement,
  property,
  state,
} from 'lit/decorators.js'
import {
  createRef,
  ref,
  type Ref,
} from 'lit/directives/ref.js'
import {
  createEditor,
  type Editor,
  type NodeJSON,
} from 'prosekit/core'

import {
  defineExtension,
  type EditorExtension,
} from './extension'

@customElement('example-lit-dom')
export class MyEditor extends LitElement {
  override createRenderRoot() {
    return this
  }

  @state()
  editor?: Editor<EditorExtension>

  @property({ type: Object, attribute: false })
  defaultContent?: NodeJSON

  private editorRef: Ref<HTMLDivElement> = createRef()

  protected override firstUpdated(): void {
    if (!this.editor) {
      const extension = defineExtension()
      this.editor = createEditor({
        extension,
        defaultContent: this.defaultContent || defaultContent,
      })
    }

    this.editor.mount(this.editorRef.value)
  }

  override render() {
    return html`
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div class="CSS_EDITOR_CONTENT" ${ref(this.editorRef)}></div>
        </div>
      </div>
    `
  }
}

const defaultContent: NodeJSON = {
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
          text: 'Image',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x80',
      },
    },
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
