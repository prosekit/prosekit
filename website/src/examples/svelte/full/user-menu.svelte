<script lang="ts">
import { Themes } from '@prosekit/themes'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/svelte/autocomplete'

import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import { users } from './user-data'

const editor = useEditor<EditorExtension>()

const handleUserInsert = (id: number, username: string) => {
  $editor.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  $editor.commands.insertText({ text: ' ' })
}
</script>

<AutocompletePopover regex={/@\w*$/} class={Themes.AUTOCOMPLETE_MENU}>
  <AutocompleteList>
    <AutocompleteEmpty class={Themes.AUTOCOMPLETE_MENU_ITEM}>No results</AutocompleteEmpty>
    {#each users as user}
      <AutocompleteItem
        class={Themes.AUTOCOMPLETE_MENU_ITEM}
        onSelect={() => handleUserInsert(user.id, user.name)}
      >
        {user.name}
      </AutocompleteItem>
    {/each}
  </AutocompleteList>
</AutocompletePopover>
