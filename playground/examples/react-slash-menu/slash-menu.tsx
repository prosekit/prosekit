import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/autocomplete-popover'

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
    <AutocompletePopover
      editor={editor}
      regex={/\/.*$/iu}
      className="AUTOCOMPLETE_MENU"
    >
      <AutocompleteList editor={editor}>
        <AutocompleteEmpty className="AUTOCOMPLETE_MENU_ITEM">
          No Command match
        </AutocompleteEmpty>

        <AutocompleteItem
          className="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingInsert(1)}
        >
          Insert Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingInsert(2)}
        >
          Insert Heading 2
        </AutocompleteItem>
        <AutocompleteItem
          className="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingConvert(1)}
        >
          Turn into Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className="AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleHeadingConvert(2)}
        >
          Turn into Heading 2
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
