import { ContextConsumer } from '@lit/context'
import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor, Union } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import {
  registerAutocompleteEmptyElement,
  registerAutocompleteItemElement,
  registerAutocompletePopupElement,
  registerAutocompletePositionerElement,
  registerAutocompleteRootElement,
} from 'prosekit/lit/autocomplete'

import { editorContext } from '../editor-context.ts'

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = new RegExp(
  canUseRegexLookbehind() ? String.raw`(?<!\S)@(\S.*)?$` : String.raw`@(\S.*)?$`,
  'u',
)

interface User {
  id: number
  name: string
}

class UserMenuElement extends LitElement {
  static override properties = {
    users: { attribute: false } satisfies PropertyDeclaration<User[]>,
    loading: { type: Boolean } satisfies PropertyDeclaration<boolean>,
  }

  users: User[] = []
  loading = false

  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  private handleUserInsert(
    editor: Editor<Union<[MentionExtension, BasicExtension]>>,
    id: number,
    username: string,
  ) {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  private handleQueryChange = (event: Event) => {
    const detail = (event as CustomEvent<string>).detail
    this.dispatchEvent(new CustomEvent('queryChange', { detail }))
  }

  private handleOpenChange = (event: Event) => {
    const detail = (event as CustomEvent<boolean>).detail
    this.dispatchEvent(new CustomEvent('openChange', { detail }))
  }

  override render() {
    const editor = this.editorConsumer.value as
      | Editor<Union<[MentionExtension, BasicExtension]>>
      | undefined
    if (!editor) {
      return nothing
    }

    return html`<prosekit-autocomplete-root
      .editor=${editor}
      .regex=${regex}
      @queryChange=${this.handleQueryChange}
      @openChange=${this.handleOpenChange}
    >
      <prosekit-autocomplete-positioner class="CSS_AUTOCOMPLETE_POSITIONER">
        <prosekit-autocomplete-popup class="CSS_AUTOCOMPLETE_POPUP">
          <div class="CSS_AUTOCOMPLETE_POPUP_CONTENT">
            <prosekit-autocomplete-empty class="CSS_AUTOCOMPLETE_MENU_ITEM">
              ${this.loading ? 'Loading...' : 'No results'}
            </prosekit-autocomplete-empty>
            ${repeat(
              this.users,
              (user) => user.id,
              (user) => html`
                <prosekit-autocomplete-item
                  class="CSS_AUTOCOMPLETE_MENU_ITEM"
                  @select=${() => this.handleUserInsert(editor, user.id, user.name)}
                >
                  <span class=${this.loading ? 'opacity-50' : nothing}>${user.name}</span>
                </prosekit-autocomplete-item>
              `,
            )}
          </div>
        </prosekit-autocomplete-popup>
      </prosekit-autocomplete-positioner>
    </prosekit-autocomplete-root>`
  }
}

export function registerLitEditorUserMenu() {
  registerAutocompleteEmptyElement()
  registerAutocompleteItemElement()
  registerAutocompletePopupElement()
  registerAutocompletePositionerElement()
  registerAutocompleteRootElement()

  if (customElements.get('lit-editor-user-menu')) return
  customElements.define('lit-editor-user-menu', UserMenuElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-user-menu': UserMenuElement
  }
}
