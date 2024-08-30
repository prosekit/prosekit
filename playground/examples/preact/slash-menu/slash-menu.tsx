import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/preact'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/preact/autocomplete'

import type { EditorExtension } from './extension'

export default function SlashMenu() {
  const editor = useEditor<EditorExtension>()

  return (
    <AutocompletePopover regex={/\/.*$/iu} className={Themes.AUTOCOMPLETE_MENU}>
      <AutocompleteList>
        <AutocompleteEmpty className={Themes.AUTOCOMPLETE_MENU_ITEM}>
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => editor.commands.setHeading({ level: 1 })}
        >
          Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => editor.commands.setHeading({ level: 2 })}
        >
          Heading 2
        </AutocompleteItem>

        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => editor.commands.wrapInList({ kind: 'task' })}
        >
          Task list
        </AutocompleteItem>

        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => editor.commands.wrapInList({ kind: 'bullet' })}
        >
          Bullet list
        </AutocompleteItem>

        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => editor.commands.wrapInList({ kind: 'ordered' })}
        >
          Ordered list
        </AutocompleteItem>

        <AutocompleteItem
          className={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => editor.commands.wrapInList({ kind: 'toggle' })}
        >
          Toggle list
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
