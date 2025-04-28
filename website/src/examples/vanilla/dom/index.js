import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  union,
} from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/lit/autocomplete'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  )
}

const editor = createEditor({ extension: defineExtension() })

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
    createItem('Insert Heading 1', () => handleHeadingInsert(1)),
    createItem('Insert Heading 2', () => handleHeadingInsert(2)),
    createItem('Turn into Heading 1', () => handleHeadingConvert(1)),
    createItem('Turn into Heading 2', () => handleHeadingConvert(2)),
  )
  list.className = 'CSS_AUTOCOMPLETE_MENU'
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
  item.className = 'CSS_AUTOCOMPLETE_MENU_ITEM'
  return item
}

/**
 * @param {number} level
 */
function handleHeadingInsert(level) {
  editor.commands.insertHeading({ level })
}

/**
 * @param {number} level
 */
function handleHeadingConvert(level) {
  editor.commands.setHeading({ level })
}

function main() {
  const root = document.querySelector('.example-vanilla-dom')
  if (!root) {
    return
  }
  root.innerHTML = ''

  const viewport = root.appendChild(document.createElement('div'))
  viewport.className = 'CSS_EDITOR_VIEWPORT'

  const scrolling = viewport.appendChild(document.createElement('div'))
  scrolling.className = 'CSS_EDITOR_SCROLLING'

  const content = scrolling.appendChild(document.createElement('div'))
  content.className = 'CSS_EDITOR_CONTENT'

  editor.mount(content)

  scrolling.appendChild(createPopover())
}

main()
