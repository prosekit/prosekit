import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'

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
    <AutocompletePopover regex={/\/.*$/iu} className={Themes.AUTOCOMPLETE_MENU}>
      <AutocompleteList>
        <AutocompleteEmpty className={Themes.AUTOCOMPLETE_MENU_ITEM}>
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleHeadingInsert(1)}
        >
          Insert Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleHeadingInsert(2)}
        >
          Insert Heading 2
        </AutocompleteItem>
        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleHeadingConvert(1)}
        >
          Turn into Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleHeadingConvert(2)}
        >
          Turn into Heading 2
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
