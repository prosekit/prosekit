import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/preact'
import { InlinePopover } from 'prosekit/preact/inline-popover'

import { Button } from '../button'

function getInlineMenuItems(editor: Editor<BasicExtension>) {
  return {
    bold: editor.commands.toggleBold
      ? {
        isActive: editor.marks.bold.isActive(),
        canExec: editor.commands.toggleBold.canExec(),
        command: () => editor.commands.toggleBold(),
      }
      : undefined,
    italic: editor.commands.toggleItalic
      ? {
        isActive: editor.marks.italic.isActive(),
        canExec: editor.commands.toggleItalic.canExec(),
        command: () => editor.commands.toggleItalic(),
      }
      : undefined,
    underline: editor.commands.toggleUnderline
      ? {
        isActive: editor.marks.underline.isActive(),
        canExec: editor.commands.toggleUnderline.canExec(),
        command: () => editor.commands.toggleUnderline(),
      }
      : undefined,
    strike: editor.commands.toggleStrike
      ? {
        isActive: editor.marks.strike.isActive(),
        canExec: editor.commands.toggleStrike.canExec(),
        command: () => editor.commands.toggleStrike(),
      }
      : undefined,
    code: editor.commands.toggleCode
      ? {
        isActive: editor.marks.code.isActive(),
        canExec: editor.commands.toggleCode.canExec(),
        command: () => editor.commands.toggleCode(),
      }
      : undefined,
    link: editor.commands.addLink
      ? {
        isActive: editor.marks.link.isActive(),
        canExec: editor.commands.addLink.canExec({ href: '' }),
        command: () => editor.commands.expandLink(),
        currentLink: getCurrentLink(editor.state) || '',
      }
      : undefined,
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
  const editor = useEditor<BasicExtension>()
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

  const handleSubmit = (
    event: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault()
    const href = event.currentTarget.querySelector('input')?.value?.trim()
    handleLinkUpdate(href)
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
        {items.bold && (
          <Button
            pressed={items.bold.isActive}
            disabled={!items.bold.canExec}
            onClick={items.bold.command}
            tooltip="Bold"
          >
            <div className="CSS_ICON_BOLD"></div>
          </Button>
        )}
        {items.italic && (
          <Button
            pressed={items.italic.isActive}
            disabled={!items.italic.canExec}
            onClick={items.italic.command}
            tooltip="Italic"
          >
            <div className="CSS_ICON_ITALIC"></div>
          </Button>
        )}
        {items.underline && (
          <Button
            pressed={items.underline.isActive}
            disabled={!items.underline.canExec}
            onClick={items.underline.command}
            tooltip="Underline"
          >
            <div className="CSS_ICON_UNDERLINE"></div>
          </Button>
        )}
        {items.strike && (
          <Button
            pressed={items.strike.isActive}
            disabled={!items.strike.canExec}
            onClick={items.strike.command}
            tooltip="Strikethrough"
          >
            <div className="CSS_ICON_STRIKETHROUGH"></div>
          </Button>
        )}
        {items.code && (
          <Button
            pressed={items.code.isActive}
            disabled={!items.code.canExec}
            onClick={items.code.command}
            tooltip="Code"
          >
            <div className="CSS_ICON_CODE"></div>
          </Button>
        )}
        {items.link && items.link.canExec && (
          <Button
            pressed={items.link.isActive}
            onClick={() => {
              items.link?.command?.()
              toggleLinkMenuOpen()
            }}
            tooltip="Link"
          >
            <div className="CSS_ICON_LINK"></div>
          </Button>
        )}
      </InlinePopover>

      {items.link && (
        <InlinePopover
          placement="bottom"
          defaultOpen={false}
          open={linkMenuOpen}
          onOpenChange={setLinkMenuOpen}
          data-testid="inline-menu-link"
          className="CSS_INLINE_MENU_LINK"
        >
          {linkMenuOpen && (
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Paste the link..."
                defaultValue={items.link.currentLink}
                className="CSS_INLINE_MENU_LINK_INPUT"
              />
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
      )}
    </>
  )
}
