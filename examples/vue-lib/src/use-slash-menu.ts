import { PopoverSuggestionContext } from 'prosekit/vue/components/popover-suggestion'

import { useNoteEditor } from './use-note-editor'

export function useSlashMenu() {
  const editor = useNoteEditor()

  const handleHeadingInsert = (level: number) => {
    const node = editor.schema.nodes.heading.create({ level })
    editor.commands.insertNode({ node })
  }

  const handleHeadingConvert = (level: number) => {
    const nodeType = editor.schema.nodes.heading
    const attrs = { level }
    editor.commands.setBlockType({ nodeType, attrs })
  }

  const getItems = (context: PopoverSuggestionContext) => {
    const query = context.query?.toLowerCase().replace(/^\//, '') || ''

    const allItems = [
      {
        id: '1',
        text: 'Insert Heading 1',
        callback: () => handleHeadingInsert(1),
      },
      {
        id: '2',
        text: 'Insert Heading 2',
        callback: () => handleHeadingInsert(2),
      },
      {
        id: '3',
        text: 'Turn into Heading 1',
        callback: () => handleHeadingConvert(1),
      },
      {
        id: '4',
        text: 'Turn into Heading 2',
        callback: () => handleHeadingConvert(2),
      },
    ]

    const filterItems = allItems.filter((item) =>
      item.text.toLowerCase().includes(query),
    )

    if (filterItems.length === 0) {
      filterItems.push({
        id: '0',
        text: 'No available item',
        callback: () => void 0,
      })
    }

    return filterItems
  }

  return { editor, getItems }
}
