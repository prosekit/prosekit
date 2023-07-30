import { MentionAttrs } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/components/autocomplete-popover'

import type { ExampleExtension } from './extension'
import { tags } from './tags'

export default function TagMenu() {
  const editor = useEditor<ExampleExtension>()

  const handleTagInsert = (id: number, value: string) => {
    const attrs: MentionAttrs = { id: id.toString(), value, kind: 'tag' }
    const node = editor.schema.nodes.mention.create(attrs)
    editor.commands.insertNode({ node })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover editor={editor} regex={/#[\da-z]*$/i}>
      <AutocompleteList editor={editor} className="example-slash-menu">
        <AutocompleteEmpty className="example-slash-menu-item">
          No Tag match
        </AutocompleteEmpty>

        {tags.map((tag) => (
          <AutocompleteItem
            key={tag.id}
            className="example-slash-menu-item"
            onSelect={() => handleTagInsert(tag.id, tag.value)}
          >
            #{tag.value}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
