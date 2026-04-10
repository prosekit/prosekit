<script lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/svelte'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/svelte/autocomplete'

interface Props {
  tags: { id: number; label: string }[]
}

const props: Props = $props()

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleTagInsert(id: number, label: string) {
  $editor.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  $editor.commands.insertText({ text: ' ' })
}

const regex = /#[\da-z]*$/i
</script>

<AutocompleteRoot {regex}>
  <AutocompletePositioner class="CSS_AUTOCOMPLETE_POSITIONER">
    <AutocompletePopup class="CSS_AUTOCOMPLETE_POPUP">
      <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
        No results
      </AutocompleteEmpty>

      {#each props.tags as tag (tag.id)}
        <AutocompleteItem
          class="CSS_AUTOCOMPLETE_MENU_ITEM"
          onSelect={() => handleTagInsert(tag.id, tag.label)}
        >
          #{tag.label}
        </AutocompleteItem>
      {/each}
    </AutocompletePopup>
  </AutocompletePositioner>
</AutocompleteRoot>
