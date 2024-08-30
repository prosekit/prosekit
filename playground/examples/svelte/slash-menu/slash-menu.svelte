<script lang="ts">
import { Themes } from '@prosekit/themes'
import {
  AutocompleteItem,
  AutocompletePopover,
  AutocompleteEmpty,
  AutocompleteList,
} from 'prosekit/svelte/autocomplete'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()
</script>

<AutocompletePopover regex={/\/.*$/iu} class={Themes.AUTOCOMPLETE_MENU}>
  <AutocompleteList>
    <AutocompleteEmpty class={Themes.AUTOCOMPLETE_MENU_ITEM}>
      No results
    </AutocompleteEmpty>

    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => $editor.commands.setHeading({ level: 1 })}
    >
      Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => $editor.commands.setHeading({ level: 2 })}
    >
      Heading 2
    </AutocompleteItem>

    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => $editor.commands.wrapInList({ kind: 'task' })}
    >
      Task list
    </AutocompleteItem>

    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => $editor.commands.wrapInList({ kind: 'bullet' })}
    >
      Bullet list
    </AutocompleteItem>

    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => $editor.commands.wrapInList({ kind: 'ordered' })}
    >
      Ordered list
    </AutocompleteItem>

    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => $editor.commands.wrapInList({ kind: 'toggle' })}
    >
      Toggle list
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
