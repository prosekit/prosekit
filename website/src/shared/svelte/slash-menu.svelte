<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import {
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/svelte/autocomplete'
import type { EditorExtension } from './extension'
import SlashMenuEmpty from './slash-menu-empty.svelte'
import SlashMenuItem from './slash-menu-item.svelte'

const editor = useEditor<EditorExtension>()

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = /\/(|\S.*)$/iu
</script>

<AutocompletePopover regex={regex} class="CSS_AUTOCOMPLETE_MENU">
  <AutocompleteList>
    <SlashMenuItem
      label="Text"
      onSelect={() => $editor.commands.setParagraph()}
    />

    <SlashMenuItem
      label="Heading 1"
      kbd="#"
      onSelect={() => $editor.commands.setHeading({ level: 1 })}
    />

    <SlashMenuItem
      label="Heading 2"
      kbd="##"
      onSelect={() => $editor.commands.setHeading({ level: 2 })}
    />

    <SlashMenuItem
      label="Heading 3"
      kbd="###"
      onSelect={() => $editor.commands.setHeading({ level: 3 })}
    />

    <SlashMenuItem
      label="Bullet list"
      kbd="-"
      onSelect={() => $editor.commands.wrapInList({ kind: 'bullet' })}
    />

    <SlashMenuItem
      label="Ordered list"
      kbd="1."
      onSelect={() => $editor.commands.wrapInList({ kind: 'ordered' })}
    />

    <SlashMenuItem
      label="Task list"
      kbd="[]"
      onSelect={() => $editor.commands.wrapInList({ kind: 'task' })}
    />

    <SlashMenuItem
      label="Toggle list"
      kbd=">>"
      onSelect={() => $editor.commands.wrapInList({ kind: 'toggle' })}
    />

    <SlashMenuItem
      label="Quote"
      kbd=">"
      onSelect={() => $editor.commands.setBlockquote()}
    />

    <SlashMenuItem
      label="Table"
      onSelect={() => $editor.commands.insertTable({ row: 3, col: 3 })}
    />

    <SlashMenuItem
      label="Divider"
      kbd="---"
      onSelect={() => $editor.commands.insertHorizontalRule()}
    />

    <SlashMenuItem
      label="Code"
      kbd="```"
      onSelect={() => $editor.commands.setCodeBlock()}
    />

    <SlashMenuEmpty />
  </AutocompleteList>
</AutocompletePopover>
