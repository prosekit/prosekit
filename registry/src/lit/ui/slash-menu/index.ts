import { SlashMenuElement } from './slash-menu'
import { SlashMenuEmptyElement } from './slash-menu-empty'
import { SlashMenuItemElement } from './slash-menu-item'

export function registryLitEditorSlashMenu() {
  if (!customElements.get('lit-editor-slash-menu-item')) {
    customElements.define('lit-editor-slash-menu-item', SlashMenuItemElement)
  }
  if (!customElements.get('lit-editor-slash-menu-empty')) {
    customElements.define('lit-editor-slash-menu-empty', SlashMenuEmptyElement)
  }
  if (customElements.get('lit-editor-slash-menu')) return
  customElements.define('lit-editor-slash-menu', SlashMenuElement)
}
