<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'

import Button from '../../ui/button/button.svelte'

import type { EditorExtension } from './extension.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    insertTwo: {
      canExec: editor.commands.insertColumnGroup.canExec({ count: 2 }),
      command: () => editor.commands.insertColumnGroup({ count: 2 }),
    },
    insertThree: {
      canExec: editor.commands.insertColumnGroup.canExec({ count: 3 }),
      command: () => editor.commands.insertColumnGroup({ count: 3 }),
    },
    addBefore: {
      canExec: editor.commands.addColumnBefore.canExec(),
      command: () => {
        if (editor.commands.addColumnBefore()) {
          editor.commands.distributeColumnGroup()
        }
      },
    },
    addAfter: {
      canExec: editor.commands.addColumnAfter.canExec(),
      command: () => {
        if (editor.commands.addColumnAfter()) {
          editor.commands.distributeColumnGroup()
        }
      },
    },
    remove: {
      canExec: editor.commands.removeColumn.canExec(),
      command: () => editor.commands.removeColumn(),
    },
    distribute: {
      canExec: editor.commands.distributeColumnGroup.canExec(),
      command: () => editor.commands.distributeColumnGroup(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={false}
    disabled={!$items.insertTwo.canExec}
    onClick={$items.insertTwo.command}
  >
    2 Columns
  </Button>
  <Button
    pressed={false}
    disabled={!$items.insertThree.canExec}
    onClick={$items.insertThree.command}
  >
    3 Columns
  </Button>
  <Button
    pressed={false}
    disabled={!$items.addBefore.canExec}
    onClick={$items.addBefore.command}
  >
    Add Before
  </Button>
  <Button
    pressed={false}
    disabled={!$items.addAfter.canExec}
    onClick={$items.addAfter.command}
  >
    Add After
  </Button>
  <Button
    pressed={false}
    disabled={!$items.remove.canExec}
    onClick={$items.remove.command}
  >
    Remove
  </Button>
  <Button
    pressed={false}
    disabled={!$items.distribute.canExec}
    onClick={$items.distribute.command}
  >
    Equalize
  </Button>
</div>
