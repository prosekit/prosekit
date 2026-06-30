import { ContextConsumer } from '@lit/context'
import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor, Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import {
  registerAutocompleteEmptyElement,
  registerAutocompleteItemElement,
  registerAutocompletePopupElement,
  registerAutocompletePositionerElement,
  registerAutocompleteRootElement,
} from 'prosekit/lit/autocomplete'

import { editorContext } from '../editor-context.ts'

const regex = /#([\da-z]*)$/i

interface Tag {
  id: number
  label: string
}

class TagMenuElement extends LitElement {
  static override properties = {
    tags: { attribute: false } satisfies PropertyDeclaration<Tag[]>,
  }

  tags: Tag[] = []

  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  private handleTagInsert(
    editor: Editor<Union<[MentionExtension, BasicExtension]>>,
    id: number,
    label: string,
  ) {
    editor.commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor.commands.insertText({ text: ' ' })
  }

  override render() {
    const editor = this.editorConsumer.value as
      | Editor<Union<[MentionExtension, BasicExtension]>>
      | undefined
    if (!editor) {
      return nothing
    }

    return html`<prosekit-autocomplete-root .editor=${editor} .regex=${regex}>
      <prosekit-autocomplete-positioner class="CSS_AUTOCOMPLETE_POSITIONER">
        <prosekit-autocomplete-popup class="CSS_AUTOCOMPLETE_POPUP">
          <div class="CSS_AUTOCOMPLETE_POPUP_CONTENT">
            <prosekit-autocomplete-empty class="CSS_AUTOCOMPLETE_MENU_ITEM">
              No results
            </prosekit-autocomplete-empty>
            ${repeat(
              this.tags,
              (tag) => tag.id,
              (tag) => html`
                <prosekit-autocomplete-item
                  class="CSS_AUTOCOMPLETE_MENU_ITEM"
                  @select=${() => this.handleTagInsert(editor, tag.id, tag.label)}
                >
                  ${'#' + tag.label}
                </prosekit-autocomplete-item>
              `,
            )}
          </div>
        </prosekit-autocomplete-popup>
      </prosekit-autocomplete-positioner>
    </prosekit-autocomplete-root>`
  }
}

export function registerLitEditorTagMenu() {
  registerAutocompleteEmptyElement()
  registerAutocompleteItemElement()
  registerAutocompletePopupElement()
  registerAutocompletePositionerElement()
  registerAutocompleteRootElement()

  if (customElements.get('lit-editor-tag-menu')) return
  customElements.define('lit-editor-tag-menu', TagMenuElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-tag-menu': TagMenuElement
  }
}
