import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind } from 'prosekit/core'
import { useEditor } from 'prosekit/react'
import { AutocompleteList, AutocompletePopover } from 'prosekit/react/autocomplete'

import SlashMenuEmpty from './slash-menu-empty'
import SlashMenuItem from './slash-menu-item'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

interface Props {
  onOpenChange: (open: boolean) => void
}

export default function SlashMenu(props: Props) {
  const editor = useEditor<BasicExtension>()

  return (
    <AutocompletePopover
      regex={regex}
      onOpenChange={(open) => {
        props.onOpenChange(open)
      }}
      className="CSS_AUTOCOMPLETE_MENU"
    >
      <AutocompleteList>
        <SlashMenuItem
          label="Text"
          onSelect={() => editor.commands.setParagraph()}
        />

        <SlashMenuItem
          label="Heading 1"
          kbd="#"
          onSelect={() => editor.commands.setHeading({ level: 1 })}
        />

        <SlashMenuItem
          label="Heading 2"
          kbd="##"
          onSelect={() => editor.commands.setHeading({ level: 2 })}
        />

        <SlashMenuItem
          label="Heading 3"
          kbd="###"
          onSelect={() => editor.commands.setHeading({ level: 3 })}
        />

        <SlashMenuItem
          label="Bullet list"
          kbd="-"
          onSelect={() => editor.commands.wrapInList({ kind: 'bullet' })}
        />

        <SlashMenuItem
          label="Ordered list"
          kbd="1."
          onSelect={() => editor.commands.wrapInList({ kind: 'ordered' })}
        />

        <SlashMenuItem
          label="Task list"
          kbd="[]"
          onSelect={() => editor.commands.wrapInList({ kind: 'task' })}
        />

        <SlashMenuItem
          label="Toggle list"
          kbd=">>"
          onSelect={() => editor.commands.wrapInList({ kind: 'toggle' })}
        />

        <SlashMenuItem
          label="Quote"
          kbd=">"
          onSelect={() => editor.commands.setBlockquote()}
        />

        <SlashMenuItem
          label="Table"
          onSelect={() => editor.commands.insertTable({ row: 3, col: 3 })}
        />

        <SlashMenuItem
          label="Divider"
          kbd="---"
          onSelect={() => editor.commands.insertHorizontalRule()}
        />

        <SlashMenuItem
          label="Code"
          kbd="```"
          onSelect={() => editor.commands.setCodeBlock()}
        />

        <SlashMenuItem
          label="Image"
          onSelect={() => editor.commands.insertImage({ src: '' })}
        />

        <SlashMenuEmpty />
      </AutocompleteList>
    </AutocompletePopover>
  )
}
