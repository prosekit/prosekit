import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind, type Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/solid/autocomplete'
import { For, type JSX } from 'solid-js'

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(\S.*)?$/u : /@(\S.*)?$/u

export default function UserMenu(props: {
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}): JSX.Element {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

  const handleUserInsert = (id: number, username: string) => {
    editor().commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor().commands.insertText({ text: ' ' })
  }

  return (
    <AutocompleteRoot
      regex={regex}
      class="contents"
      onQueryChange={(event) => props.onQueryChange?.(event.detail)}
      onOpenChange={(event) => props.onOpenChange?.(event.detail)}
    >
      <AutocompletePositioner>
        <AutocompletePopup class="CSS_AUTOCOMPLETE_MENU">
          <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
            {props.loading ? 'Loading...' : 'No results'}
          </AutocompleteEmpty>

          <For each={props.users}>
            {(user) => (
              <AutocompleteItem
                class="CSS_AUTOCOMPLETE_MENU_ITEM"
                onSelect={() => handleUserInsert(user.id, user.name)}
              >
                <span class={props.loading ? 'opacity-50' : undefined}>
                  {user.name}
                </span>
              </AutocompleteItem>
            )}
          </For>
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
