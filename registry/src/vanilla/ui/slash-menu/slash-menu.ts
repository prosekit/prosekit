import 'prosekit/web/autocomplete'

import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'
import type {
  AutocompleteListElement,
  AutocompletePopoverElement,
} from 'prosekit/web/autocomplete'

import { renderSlashMenuEmpty } from './slash-menu-empty'
import { renderSlashMenuItem } from './slash-menu-item'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

export function renderSlashMenu(
  editor: Editor<BasicExtension>,
) {
  const popover = document.createElement('prosekit-autocomplete-popover') as AutocompletePopoverElement
  popover.classList.add('CSS_AUTOCOMPLETE_MENU')
  popover.editor = editor
  popover.regex = regex

  const list = document.createElement('prosekit-autocomplete-list') as AutocompleteListElement
  list.editor = editor
  popover.append(list)

  list.append(renderSlashMenuItem({ label: 'Text', kbd: undefined, onSelect: () => editor.commands.setParagraph() }))
  list.append(renderSlashMenuItem({ label: 'Heading 1', kbd: '#', onSelect: () => editor.commands.setHeading({ level: 1 }) }))
  list.append(renderSlashMenuItem({ label: 'Heading 2', kbd: '##', onSelect: () => editor.commands.setHeading({ level: 2 }) }))
  list.append(renderSlashMenuItem({ label: 'Heading 3', kbd: '###', onSelect: () => editor.commands.setHeading({ level: 3 }) }))
  list.append(renderSlashMenuItem({ label: 'Bullet list', kbd: '-', onSelect: () => editor.commands.wrapInList({ kind: 'bullet' }) }))
  list.append(renderSlashMenuItem({ label: 'Ordered list', kbd: '1.', onSelect: () => editor.commands.wrapInList({ kind: 'ordered' }) }))
  list.append(renderSlashMenuItem({ label: 'Task list', kbd: '[]', onSelect: () => editor.commands.wrapInList({ kind: 'task' }) }))
  list.append(renderSlashMenuItem({ label: 'Toggle list', kbd: '>>', onSelect: () => editor.commands.wrapInList({ kind: 'toggle' }) }))
  list.append(renderSlashMenuItem({ label: 'Quote', kbd: '>', onSelect: () => editor.commands.setBlockquote() }))
  list.append(renderSlashMenuItem({ label: 'Table', onSelect: () => editor.commands.insertTable({ row: 3, col: 3 }) }))
  list.append(renderSlashMenuItem({ label: 'Divider', kbd: '---', onSelect: () => editor.commands.insertHorizontalRule() }))
  list.append(renderSlashMenuItem({ label: 'Code', kbd: '```', onSelect: () => editor.commands.setCodeBlock() }))
  list.append(renderSlashMenuEmpty())

  return popover
}
