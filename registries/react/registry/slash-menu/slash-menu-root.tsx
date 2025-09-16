import { canUseRegexLookbehind } from 'prosekit/core'
import {
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'

import SlashMenuEmpty from './slash-menu-empty'
import SlashMenuItem, { type SlashMenuItemProps } from './slash-menu-item'

export interface SlashMenuRootProps {
  items: SlashMenuItemProps[]
}

export default function SlashMenuRoot({ items }: SlashMenuRootProps) {
  // Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
  const regex = canUseRegexLookbehind() ? /(?<!\S)\/(|\S.*)$/u : /\/(|\S.*)$/u

  return (
    <AutocompletePopover regex={regex} className="CSS_AUTOCOMPLETE_MENU">
      <AutocompleteList>
        {items.map((item) => <SlashMenuItem key={item.label} {...item} />)}
        <SlashMenuEmpty />
      </AutocompleteList>
    </AutocompletePopover>
  )
}
