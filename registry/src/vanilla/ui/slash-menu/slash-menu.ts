import 'prosekit/web/autocomplete'

import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'
import type { AutocompletePopupElement, AutocompletePositionerElement, AutocompleteRootElement } from 'prosekit/web/autocomplete'

import { renderSlashMenuEmpty } from './slash-menu-empty'
import { renderSlashMenuItem } from './slash-menu-item'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

export function renderSlashMenu(
  editor: Editor<BasicExtension>,
) {
  const root = document.createElement('prosekit-autocomplete-root') as AutocompleteRootElement
  root.editor = editor
  root.regex = regex

  const positioner = document.createElement('prosekit-autocomplete-positioner') as AutocompletePositionerElement
  positioner.className = 'CSS_AUTOCOMPLETE_POSITIONER'

  const popup = document.createElement('prosekit-autocomplete-popup') as AutocompletePopupElement
  popup.className = 'CSS_AUTOCOMPLETE_POPUP'

  popup.append(renderSlashMenuItem({ label: 'Text', kbd: undefined, onSelect: () => editor.commands.setParagraph() }))
  popup.append(renderSlashMenuItem({ label: 'Heading 1', kbd: '#', onSelect: () => editor.commands.setHeading({ level: 1 }) }))
  popup.append(renderSlashMenuItem({ label: 'Heading 2', kbd: '##', onSelect: () => editor.commands.setHeading({ level: 2 }) }))
  popup.append(renderSlashMenuItem({ label: 'Heading 3', kbd: '###', onSelect: () => editor.commands.setHeading({ level: 3 }) }))
  popup.append(renderSlashMenuItem({ label: 'Bullet list', kbd: '-', onSelect: () => editor.commands.wrapInList({ kind: 'bullet' }) }))
  popup.append(renderSlashMenuItem({ label: 'Ordered list', kbd: '1.', onSelect: () => editor.commands.wrapInList({ kind: 'ordered' }) }))
  popup.append(renderSlashMenuItem({ label: 'Task list', kbd: '[]', onSelect: () => editor.commands.wrapInList({ kind: 'task' }) }))
  popup.append(renderSlashMenuItem({ label: 'Toggle list', kbd: '>>', onSelect: () => editor.commands.wrapInList({ kind: 'toggle' }) }))
  popup.append(renderSlashMenuItem({ label: 'Quote', kbd: '>', onSelect: () => editor.commands.setBlockquote() }))
  popup.append(renderSlashMenuItem({ label: 'Table', onSelect: () => editor.commands.insertTable({ row: 3, col: 3 }) }))
  popup.append(renderSlashMenuItem({ label: 'Divider', kbd: '---', onSelect: () => editor.commands.insertHorizontalRule() }))
  popup.append(renderSlashMenuItem({ label: 'Code', kbd: '```', onSelect: () => editor.commands.setCodeBlock() }))
  popup.append(renderSlashMenuEmpty())

  positioner.append(popup)
  root.append(positioner)

  return root
}
