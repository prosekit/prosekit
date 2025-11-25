<script lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import {
  canUseRegexLookbehind,
  type Union,
} from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/svelte'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/svelte/autocomplete'

interface Props {
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}

const props: Props = $props()
const loading = $derived(props.loading ?? false)

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleUserInsert(id: number, username: string) {
  $editor.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  $editor.commands.insertText({ text: ' ' })
}

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(|\S.*)$/u : /@(|\S.*)$/u
</script>

<AutocompletePopover
  {regex}
  class="CSS_AUTOCOMPLETE_MENU"
  onQueryChange={props.onQueryChange}
  onOpenChange={props.onOpenChange}
>
  <AutocompleteList>
    <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
      {loading ? 'Loading...' : 'No results'}
    </AutocompleteEmpty>

    {#each props.users as user (user.id)}
      <AutocompleteItem
        class="CSS_AUTOCOMPLETE_MENU_ITEM"
        onSelect={() => handleUserInsert(user.id, user.name)}
      >
        {#if loading}
          <span class="opacity-50">
            {user.name}
          </span>
        {:else}
          <span>
            {user.name}
          </span>
        {/if}
      </AutocompleteItem>
    {/each}
  </AutocompleteList>
</AutocompletePopover>
