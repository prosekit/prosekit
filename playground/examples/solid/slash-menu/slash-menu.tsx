import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/solid/autocomplete'

import type { EditorExtension } from './extension'

export default function SlashMenu() {
  const editor = useEditor<EditorExtension>()

  function isBlockEmpty() {
    const selection = editor().view.state.selection
    return selection.empty && selection.$from.parent.content.size === 0
  }

  function handleSelectHeading(level: number) {
    if (isBlockEmpty()) {
      editor().commands.setHeading({ level })
    } else {
      editor().commands.insertHeading({ level })
    }
  }

  function handleSelectList(kind: 'task' | 'bullet' | 'ordered' | 'toggle') {
    if (isBlockEmpty()) {
      editor().commands.wrapInList({ kind })
    } else {
      editor().commands.insertList({ kind })
    }
  }

  return (
    <AutocompletePopover regex={/\/.*$/iu} class={Themes.AUTOCOMPLETE_MENU}>
      <AutocompleteList>
        <AutocompleteEmpty class={Themes.AUTOCOMPLETE_MENU_ITEM}>
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          class={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleSelectHeading(1)}
        >
          Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleSelectHeading(2)}
        >
          Heading 2
        </AutocompleteItem>

        <AutocompleteItem
          class={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleSelectList('task')}
        >
          Task list
        </AutocompleteItem>

        <AutocompleteItem
          class={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleSelectList('bullet')}
        >
          Bullet list
        </AutocompleteItem>

        <AutocompleteItem
          class={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleSelectList('ordered')}
        >
          Ordered list
        </AutocompleteItem>

        <AutocompleteItem
          class={Themes.AUTOCOMPLETE_MENU_ITEM}
          onSelect={() => handleSelectList('toggle')}
        >
          Toggle list
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
