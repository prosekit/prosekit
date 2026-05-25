'use client'

import type { Editor } from 'prosekit/core'
import { findParentColumn } from 'prosekit/extensions/columns'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from '../../ui/button/button.tsx'

import type { EditorExtension } from './extension.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  const currentColumn = findParentColumn(editor.state.selection.$anchor)
  const currentGap = currentColumn
    ? (editor.state.doc.nodeAt(currentColumn.containerPos)?.attrs.gap as number | null | undefined) ?? null
    : null

  return {
    canSetGap: !!currentColumn,
    currentGap,
    insertTwo: {
      canExec: editor.commands.insertColumns.canExec({ count: 2 }),
      command: () => editor.commands.insertColumns({ count: 2 }),
    },
    insertThree: {
      canExec: editor.commands.insertColumns.canExec({ count: 3 }),
      command: () => editor.commands.insertColumns({ count: 3 }),
    },
    addBefore: {
      canExec: editor.commands.addColumnBefore.canExec(),
      command: () => {
        if (editor.commands.addColumnBefore()) {
          editor.commands.distributeColumns()
        }
      },
    },
    addAfter: {
      canExec: editor.commands.addColumnAfter.canExec(),
      command: () => {
        if (editor.commands.addColumnAfter()) {
          editor.commands.distributeColumns()
        }
      },
    },
    remove: {
      canExec: editor.commands.removeColumn.canExec(),
      command: () => editor.commands.removeColumn(),
    },
    distribute: {
      canExec: editor.commands.distributeColumns.canExec(),
      command: () => editor.commands.distributeColumns(),
    },
    setGap: (value: number) => editor.commands.setColumnsGap(value),
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!items.insertTwo.canExec}
        onClick={items.insertTwo.command}
      >
        2 Columns
      </Button>
      <Button
        pressed={false}
        disabled={!items.insertThree.canExec}
        onClick={items.insertThree.command}
      >
        3 Columns
      </Button>
      <Button
        pressed={false}
        disabled={!items.addBefore.canExec}
        onClick={items.addBefore.command}
      >
        Add Before
      </Button>
      <Button
        pressed={false}
        disabled={!items.addAfter.canExec}
        onClick={items.addAfter.command}
      >
        Add After
      </Button>
      <Button
        pressed={false}
        disabled={!items.remove.canExec}
        onClick={items.remove.command}
      >
        Remove
      </Button>
      <Button
        pressed={false}
        disabled={!items.distribute.canExec}
        onClick={items.distribute.command}
      >
        Equalize
      </Button>
      <label className="flex items-center gap-2 px-2 text-sm text-gray-700 dark:text-gray-300">
        Gap
        <input
          type="range"
          min={0}
          max={48}
          step={4}
          value={items.currentGap ?? 20}
          disabled={!items.canSetGap}
          onChange={(event) => items.setGap(Number(event.target.value))}
        />
      </label>
    </div>
  )
}
