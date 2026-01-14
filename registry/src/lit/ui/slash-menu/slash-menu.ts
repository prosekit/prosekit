import 'prosekit/lit/autocomplete'

import {
  html,
  LitElement,
  type PropertyDeclaration,
} from 'lit'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

class SlashMenuElement extends LitElement {
  static override properties = {
    editor: { attribute: false } satisfies PropertyDeclaration<Editor>,
  }

  editor?: Editor<BasicExtension>

  constructor() {
    super()
  }

  override createRenderRoot() {
    return this
  }

  override render() {
    const editor = this.editor
    if (!editor) {
      return html`<p>No editor provided</p>`
    }

    return html`<prosekit-autocomplete-popover .editor=${editor} .regex=${regex} class="CSS_AUTOCOMPLETE_MENU">
      <prosekit-autocomplete-list .editor=${editor}  >
        <lit-editor-slash-menu-item class="contents" label="Text" @select=${() => editor.commands.setParagraph()} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Heading 1" kbd="#" @select=${() => editor.commands.setHeading({ level: 1 })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Heading 2" kbd="##" @select=${() => editor.commands.setHeading({ level: 2 })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Heading 3" kbd="###" @select=${() => editor.commands.setHeading({ level: 3 })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Bullet list" kbd="-" @select=${() => editor.commands.wrapInList({ kind: 'bullet' })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Ordered list" kbd="1." @select=${() => editor.commands.wrapInList({ kind: 'ordered' })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Task list" kbd="[]" @select=${() => editor.commands.wrapInList({ kind: 'task' })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Toggle list" kbd=">>" @select=${() => editor.commands.wrapInList({ kind: 'toggle' })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Quote" kbd=">" @select=${() => editor.commands.setBlockquote()} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Table" @select=${() => editor.commands.insertTable({ row: 3, col: 3 })} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Divider" kbd="---" @select=${() => editor.commands.insertHorizontalRule()} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-item class="contents" label="Code" kbd="\`\`\`" @select=${() => editor.commands.setCodeBlock()} ></lit-editor-slash-menu-item>
        <lit-editor-slash-menu-empty ></lit-editor-slash-menu-empty>
      </prosekit-autocomplete-list>
    </prosekit-autocomplete-popover>`
  }
}

customElements.define('lit-editor-slash-menu', SlashMenuElement)
