import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import { useState } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>({ update: true })

  const [linkMenuOpen, setLinkMenuOpen] = useState(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const getCurrentLink = (state: EditorState): string | undefined => {
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
        <Button
          pressed={editor.marks.bold.isActive()}
          disabled={!editor.commands.toggleBold.canExec()}
          onClick={() => editor.commands.toggleBold()}
          tooltip="Bold"
        >
          <div className="CSS_ICON_BOLD"></div>
        </Button>

        <Button
          pressed={editor.marks.italic.isActive()}
          disabled={!editor.commands.toggleItalic.canExec()}
          onClick={() => editor.commands.toggleItalic()}
          tooltip="Italic"
        >
          <div className="CSS_ICON_ITALIC"></div>
        </Button>

        <Button
          pressed={editor.marks.underline.isActive()}
          disabled={!editor.commands.toggleUnderline.canExec()}
          onClick={() => editor.commands.toggleUnderline()}
          tooltip="Underline"
        >
          <div className="CSS_ICON_UNDERLINE"></div>
        </Button>

        <Button
          pressed={editor.marks.strike.isActive()}
          disabled={!editor.commands.toggleStrike.canExec()}
          onClick={() => editor.commands.toggleStrike()}
          tooltip="Strikethrough"
        >
          <div className="CSS_ICON_STRIKE"></div>
        </Button>

        <Button
          pressed={editor.marks.code.isActive()}
          disabled={!editor.commands.toggleCode.canExec()}
          onClick={() => editor.commands.toggleCode()}
          tooltip="Code"
        >
          <div className="CSS_ICON_CODE"></div>
        </Button>

        {editor.commands.addLink.canExec({ href: '' }) && (
          <Button
            pressed={editor.marks.link.isActive()}
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
              defaultValue={getCurrentLink(editor.state)}
              className="CSS_INLINE_MENU_LINK_INPUT"
            >
            </input>
          </form>
        )}
        {editor.marks.link.isActive() && (
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
