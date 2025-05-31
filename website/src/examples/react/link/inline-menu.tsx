import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import {
  useEditor,
  useEditorDerivedValue,
} from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import { useState } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

function getInlineMenuItems(editor: Editor<EditorExtension>) {
  return {
    link: {
      isActive: editor.marks.link.isActive(),
      canExec: editor.commands.addLink.canExec({ href: '' }),
      command: () => editor.commands.expandLink(),
      currentLink: getCurrentLink(editor.state),
    },
  }
}

function getCurrentLink(state: EditorState): string | undefined {
  const { $from } = state.selection
  const marks = $from.marksAcross($from)
  if (!marks) {
    return
  }
  for (const mark of marks) {
    if (mark.type.name === 'link') {
      return (mark.attrs as LinkAttrs).href
    }
  }
}

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>()
  const items = useEditorDerivedValue(getInlineMenuItems)

  const [linkMenuOpen, setLinkMenuOpen] = useState(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor.commands.addLink({ href })
    } else {
      editor.commands.removeLink()
    }

    setLinkMenuOpen(false)
    editor.focus()
  }

  return (
    <>
      <InlinePopover
        data-testid="inline-menu-main"
        className="CSS_INLINE_MENU_MAIN"
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        {items.link.canExec && (
          <Button
            pressed={items.link.isActive}
            onClick={() => {
              editor.commands.expandLink()
              toggleLinkMenuOpen()
            }}
            tooltip="Link"
          >
            <div className="CSS_ICON_LINK"></div>
          </Button>
        )}
      </InlinePopover>

      <InlinePopover
        placement={'bottom'}
        defaultOpen={false}
        open={linkMenuOpen}
        onOpenChange={setLinkMenuOpen}
        data-testid="inline-menu-link"
        className="CSS_INLINE_MENU_LINK"
      >
        {linkMenuOpen && (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const target = event.target as HTMLFormElement | null
              const href = target?.querySelector('input')?.value?.trim()
              handleLinkUpdate(href)
            }}
          >
            <input
              placeholder="Paste the link..."
              defaultValue={items.link.currentLink}
              className="CSS_INLINE_MENU_LINK_INPUT"
            >
            </input>
          </form>
        )}
        {items.link.isActive && (
          <button
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            className="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"
          >
            Remove link
          </button>
        )}
      </InlinePopover>
    </>
  )
}
