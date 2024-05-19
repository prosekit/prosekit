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

const handleHeadingInsert = (level: number) => {
  $editor.commands.insertHeading({ level })
}

const handleHeadingConvert = (level: number) => {
  $editor.commands.setHeading({ level })
}
</script>

<AutocompletePopover regex={/\/.*$/iu} class={Themes.AUTOCOMPLETE_MENU}>
  <AutocompleteList>
    <AutocompleteEmpty class={Themes.AUTOCOMPLETE_MENU_ITEM}>
      No results
    </AutocompleteEmpty>

    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => handleHeadingInsert(1)}
    >
      Insert Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => handleHeadingInsert(2)}
    >
      Insert Heading 2
    </AutocompleteItem>
    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => handleHeadingConvert(1)}
    >
      Turn into Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class={Themes.AUTOCOMPLETE_MENU_ITEM}
      onSelect={() => handleHeadingConvert(2)}
    >
      Turn into Heading 2
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
