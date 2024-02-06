import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import { useState } from 'react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>({ update: true })

  const [linkMenuAvailable, setLinkMenuAvailable] = useState(false)
  const toggleLinkMenuAvailable = () => setLinkMenuAvailable((open) => !open)

  const getCurrentLink = (state: EditorState): string | undefined => {
    const { $from, $to } = state.selection
    const marks = $from.marksAcross($to)
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

    setLinkMenuAvailable(false)
    editor.focus()
  }

  return (
    <>
      <InlinePopover
        className="INLINE_MENU_MAIN"
        editor={editor}
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuAvailable(false)
          }
        }}
      >
        <Toggle
          pressed={editor.marks.bold.isActive()}
          disabled={!editor.commands.toggleBold.canApply()}
          onClick={() => editor.commands.toggleBold()}
        >
          <div className="ICON_BOLD"></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.italic.isActive()}
          disabled={!editor.commands.toggleItalic.canApply()}
          onClick={() => editor.commands.toggleItalic()}
        >
          <div className="ICON_ITALIC"></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.underline.isActive()}
          disabled={!editor.commands.toggleUnderline.canApply()}
          onClick={() => editor.commands.toggleUnderline()}
        >
          <div className="ICON_UNDERLINE"></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.strike.isActive()}
          disabled={!editor.commands.toggleStrike.canApply()}
          onClick={() => editor.commands.toggleStrike()}
        >
          <div className="ICON_STRIKE"></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.code.isActive()}
          disabled={!editor.commands.toggleCode.canApply()}
          onClick={() => editor.commands.toggleCode()}
        >
          <div className="ICON_CODE"></div>
        </Toggle>

        {editor.commands.addLink.canApply({ href: '' }) && (
          <Toggle
            pressed={editor.marks.link.isActive()}
            onClick={() => {
              editor.commands.expandLink()
              toggleLinkMenuAvailable()
            }}
          >
            <div className="ICON_LINK"></div>
          </Toggle>
        )}
      </InlinePopover>

      <InlinePopover
        className="INLINE_MENU_LINK"
        editor={editor}
        positioning={{
          strategy: 'fixed',
          placement: 'bottom',
          offset: 12,
          flip: false,
          hide: true,
          shift: true,
          overlap: true,
          fitViewport: true,
          inline: true,
        }}
        available={linkMenuAvailable}
        onOpenChange={setLinkMenuAvailable}
      >
        {linkMenuAvailable && (
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
              className="INLINE_MENU_LINK_INPUT"
            ></input>
          </form>
        )}
        {editor.marks.link.isActive() && (
          <button
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            className="INLINE_MENU_LINK_REMOVE_BUTTON"
          >
            Remove link
          </button>
        )}
      </InlinePopover>
    </>
  )
}
