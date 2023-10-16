import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { AutocompleteItem } from 'prosekit/lit/autocomplete-item'
import { AutocompleteList } from 'prosekit/lit/autocomplete-list'
import { AutocompletePopover } from 'prosekit/lit/autocomplete-popover'

export function defineExampleExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  ])
}

const editor = createEditor({ extension: defineExampleExtension() })

function createPopover() {
  const popover = new AutocompletePopover()
  popover.editor = editor
  popover.regex = /\/(\w*)$/
  popover.append(createList())
  return popover
}

function createList() {
  const list = new AutocompleteList()
  list.editor = editor
  list.append(
    createItem('Insert Heading 1', () => handleHeadingConvert(1)),
    createItem('Insert Heading 2', () => handleHeadingConvert(2)),
    createItem('Insert Heading 3', () => handleHeadingConvert(3)),
  )
  list.className = 'SLASH_MENU'
  return list
}

/**
 * @param {string} text
 * @param {function} callback
 */
function createItem(text, callback) {
  const item = new AutocompleteItem()
  item.append(text)
  item.onSelect = callback
  item.className = 'SLASH_MENU_ITEM'
  return item
}

/**
 * @param {number} level
 */
function handleHeadingConvert(level) {
  const nodeType = editor.schema.nodes.heading
  const attrs = { level }
  editor.commands.setBlockType({ nodeType, attrs })
}

function main() {
  let container = document.querySelector('.example-container')
  if (!container) {
    container = document.body.appendChild(document.createElement('div'))
    container.classList.add('example-container')
  }

  const content = container.appendChild(document.createElement('div'))
  content.className = 'EDITOR_CONTENT'
  editor.mount(content)

  container.appendChild(createPopover())
}

main()
