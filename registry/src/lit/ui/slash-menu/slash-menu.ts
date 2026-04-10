import 'prosekit/lit/autocomplete'

import { ContextConsumer } from '@lit/context'
import { html, LitElement } from 'lit'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'

import { editorContext } from '../editor-context'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

class SlashMenuElement extends LitElement {
  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  override render() {
    const editor = this.editorConsumer.value as Editor<BasicExtension> | undefined
    if (!editor) {
      return html``
    }

    return html`<prosekit-autocomplete-root .editor=${editor} .regex=${regex} class="contents">
      <prosekit-autocomplete-positioner>
        <prosekit-autocomplete-popup class="CSS_AUTOCOMPLETE_MENU">
          <lit-editor-slash-menu-item
            class="contents"
            label="Text"
            @select=${() => editor.commands.setParagraph()}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Heading 1"
            kbd="#"
            @select=${() => editor.commands.setHeading({ level: 1 })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Heading 2"
            kbd="##"
            @select=${() => editor.commands.setHeading({ level: 2 })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Heading 3"
            kbd="###"
            @select=${() => editor.commands.setHeading({ level: 3 })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Bullet list"
            kbd="-"
            @select=${() => editor.commands.wrapInList({ kind: 'bullet' })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Ordered list"
            kbd="1."
            @select=${() => editor.commands.wrapInList({ kind: 'ordered' })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Task list"
            kbd="[]"
            @select=${() => editor.commands.wrapInList({ kind: 'task' })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Toggle list"
            kbd=">>"
            @select=${() => editor.commands.wrapInList({ kind: 'toggle' })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Quote"
            kbd=">"
            @select=${() => editor.commands.setBlockquote()}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Table"
            @select=${() => editor.commands.insertTable({ row: 3, col: 3 })}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Divider"
            kbd="---"
            @select=${() => editor.commands.insertHorizontalRule()}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-item
            class="contents"
            label="Code"
            kbd="\`\`\`"
            @select=${() => editor.commands.setCodeBlock()}
          ></lit-editor-slash-menu-item>
          <lit-editor-slash-menu-empty class="contents"></lit-editor-slash-menu-empty>
        </prosekit-autocomplete-popup>
      </prosekit-autocomplete-positioner>
    </prosekit-autocomplete-root>`
  }
}

customElements.define('lit-editor-slash-menu', SlashMenuElement)
