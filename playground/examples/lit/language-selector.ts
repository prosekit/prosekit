// @unocss-include

import type { HLJSApi } from 'highlight.js'
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import type { Editor } from 'prosekit/core'
import 'prosekit/lit/components/code-block-popover'
import 'prosekit/lit/components/combo-box'
import 'prosekit/lit/components/combo-box-input'
import 'prosekit/lit/components/combo-box-item'
import 'prosekit/lit/components/combo-box-list'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'

import type { RootExtension } from './extension'

@customElement('my-language-selector')
export class LanguageSelector extends LitElement {
  createRenderRoot() {
    return this
  }

  @property({ reflect: false, type: Object, attribute: false })
  editor?: Editor<RootExtension>

  @property({ reflect: false, type: Object, attribute: false })
  hljs?: HLJSApi | undefined

  private buttonRef: Ref<HTMLElement> = createRef()

  private listLanguages(): string[] {
    return this.hljs?.listLanguages() ?? []
  }

  private setLanguage(language: string) {
    this.editor?.commands.setCodeBlockLanguage(language)
    this.requestUpdate()
  }

  private getLanguage(): string {
    // TODO: This should be a simpler API
    const node = this.editor?.view.state.selection.$from.parent
    return (node?.attrs as CodeBlockAttrs)?.language || ''
  }

  @state()
  private showComboBox = false

  private toggleComboBox() {
    this.showComboBox = !this.showComboBox
  }

  private closeComboBox() {
    this.showComboBox = false
  }

  render() {
    return html`
      <prosekit-code-block-popover .editor=${this.editor}>
        <button
          class="LANGUAGE_BUTTON"
          ${ref(this.buttonRef)}
          @click=${() => this.toggleComboBox()}
        >
          ${this.getLanguage() || 'Plain Text'}
        </button>
      </prosekit-code-block-popover>

      <prosekit-combo-box
        class="LANGUAGE_COMBO_BOX"
        .reference=${this.buttonRef.value}
        .active=${this.showComboBox}
        .onDismiss=${() => this.closeComboBox()}
      >
        <prosekit-combo-box-input
          placeholder="Search for a langauge..."
          class="LANGUAGE_COMBO_BOX_INPUT"
        ></prosekit-combo-box-input>
        <prosekit-combo-box-list class="LANGUAGE_COMBO_BOX_LIST">
          ${this.listLanguages().map(
            (language) => html`
              <prosekit-combo-box-item
                class="LANGUAGE_COMBO_BOX_ITEM"
                .onSelect=${() => this.setLanguage(language)}
              >
                ${language}
              </prosekit-combo-box-item>
            `,
          )}
        </prosekit-combo-box-list>
      </prosekit-combo-box>
    `
  }
}
