import { Themes } from '@prosekit/themes'
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
        className={Themes.INLINE_MENU_MAIN}
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Button
          pressed={editor.marks.bold.isActive()}
          disabled={!editor.commands.toggleBold.canApply()}
          onClick={() => editor.commands.toggleBold()}
          tooltip="Bold"
        >
          <div className={Themes.ICON_BOLD}></div>
        </Button>

        <Button
          pressed={editor.marks.italic.isActive()}
          disabled={!editor.commands.toggleItalic.canApply()}
          onClick={() => editor.commands.toggleItalic()}
          tooltip="Italic"
        >
          <div className={Themes.ICON_ITALIC}></div>
        </Button>

        <Button
          pressed={editor.marks.underline.isActive()}
          disabled={!editor.commands.toggleUnderline.canApply()}
          onClick={() => editor.commands.toggleUnderline()}
          tooltip="Underline"
        >
          <div className={Themes.ICON_UNDERLINE}></div>
        </Button>

        <Button
          pressed={editor.marks.strike.isActive()}
          disabled={!editor.commands.toggleStrike.canApply()}
          onClick={() => editor.commands.toggleStrike()}
          tooltip="Strikethrough"
        >
          <div className={Themes.ICON_STRIKE}></div>
        </Button>

        <Button
          pressed={editor.marks.code.isActive()}
          disabled={!editor.commands.toggleCode.canApply()}
          onClick={() => editor.commands.toggleCode()}
          tooltip="Code"
        >
          <div className={Themes.ICON_CODE}></div>
        </Button>

        {editor.commands.addLink.canApply({ href: '' }) && (
          <Button
            pressed={editor.marks.link.isActive()}
            onClick={() => {
              editor.commands.expandLink()
              toggleLinkMenuOpen()
            }}
            tooltip="Link"
          >
            <div className={Themes.ICON_LINK}></div>
          </Button>
        )}
      </InlinePopover>

      <InlinePopover
        placement={'bottom'}
        defaultOpen={false}
        open={linkMenuOpen}
        onOpenChange={setLinkMenuOpen}
        data-testid="inline-menu-link"
        className={Themes.INLINE_MENU_LINK}
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
              className={Themes.INLINE_MENU_LINK_INPUT}
            ></input>
          </form>
        )}
        {editor.marks.link.isActive() && (
          <button
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            className={Themes.INLINE_MENU_LINK_REMOVE_BUTTON}
          >
            Remove link
          </button>
        )}
      </InlinePopover>
    </>
  )
}
