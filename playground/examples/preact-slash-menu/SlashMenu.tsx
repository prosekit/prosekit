/** @jsxImportSource preact */

import { useEditor } from 'prosekit/preact'
import { AutocompleteEmpty } from 'prosekit/preact/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/preact/autocomplete-item'
import { AutocompleteList } from 'prosekit/preact/autocomplete-list'
import { AutocompletePopover } from 'prosekit/preact/autocomplete-popover'

import type { EditorExtension } from './extension'

export default function SlashMenu() {
  const editor = useEditor<EditorExtension>()

  const handleHeadingInsert = (level: number) => {
    editor.commands.insertHeading({ level })
  }

  const handleHeadingConvert = (level: number) => {
    editor.commands.setHeading({ level })
  }

  return (
    <AutocompletePopover editor={editor} regex={/\/.*$/iu}>
      <AutocompleteList editor={editor} class="SLASH_MENU">
        <AutocompleteEmpty class="SLASH_MENU_ITEM">
          No Command match
        </AutocompleteEmpty>

        <AutocompleteItem
          class="SLASH_MENU_ITEM"
          onSelect={() => handleHeadingInsert(1)}
        >
          Insert Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class="SLASH_MENU_ITEM"
          onSelect={() => handleHeadingInsert(2)}
        >
          Insert Heading 2
        </AutocompleteItem>
        <AutocompleteItem
          class="SLASH_MENU_ITEM"
          onSelect={() => handleHeadingConvert(1)}
        >
          Turn into Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class="SLASH_MENU_ITEM"
          onSelect={() => handleHeadingConvert(2)}
        >
          Turn into Heading 2
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
