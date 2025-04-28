<script lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/svelte/autocomplete'

import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import { tags } from './tag-data'

const editor = useEditor<EditorExtension>()

const handleTagInsert = (id: number, label: string) => {
  $editor.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  $editor.commands.insertText({ text: ' ' })
}
</script>

<AutocompletePopover regex={/#[\da-z]*$/i} class="CSS_AUTOCOMPLETE_MENU">
  <AutocompleteList>
    <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">No results</AutocompleteEmpty>
    {#each tags as tag}
      <AutocompleteItem
        class="CSS_AUTOCOMPLETE_MENU_ITEM"
        onSelect={() => handleTagInsert(tag.id, tag.label)}
      >
        {tag.label}
      </AutocompleteItem>
    {/each}
  </AutocompleteList>
</AutocompletePopover>
