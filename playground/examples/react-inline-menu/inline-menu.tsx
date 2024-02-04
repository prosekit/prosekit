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
        className="INLINE_MENU"
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
          Bold
        </Toggle>
        <Toggle
          pressed={editor.marks.italic.isActive()}
          disabled={!editor.commands.toggleItalic.canApply()}
          onClick={() => editor.commands.toggleItalic()}
        >
          Italic
        </Toggle>
        <Toggle
          pressed={editor.marks.underline.isActive()}
          disabled={!editor.commands.toggleUnderline.canApply()}
          onClick={() => editor.commands.toggleUnderline()}
        >
          Underline
        </Toggle>

        {editor.commands.toggleUnderline.canApply() && (
          <Toggle
            pressed={editor.marks.link.isActive()}
            onClick={() => {
              toggleLinkMenuAvailable()
              editor.commands.expandLink()
            }}
          >
            Link
          </Toggle>
        )}
      </InlinePopover>

      <InlinePopover
        className="INLINE_MENU"
        editor={editor}
        positioning={{ placement: 'bottom' }}
        available={linkMenuAvailable}
        onOpenChange={setLinkMenuAvailable}
      >
        {linkMenuAvailable && (
          <form
            onSubmit={(event) => {
              event.preventDefault()

              const target = event.target as HTMLFormElement

              const href = target.querySelector('input')?.value?.trim()

              handleLinkUpdate(href)
            }}
          >
            <input
              placeholder="Paste link"
              defaultValue={getCurrentLink(editor.state)}
            ></input>
          </form>
        )}
        {editor.marks.link.isActive() && (
          <button
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
          >
            Remove link
          </button>
        )}
      </InlinePopover>
    </>
  )
}
