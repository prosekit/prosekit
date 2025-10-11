import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/solid'
import { InlinePopover } from 'prosekit/solid/inline-popover'
import {
  createEffect,
  createMemo,
  createSignal,
  Show,
} from 'solid-js'

import Button from './button'
import type { EditorExtension } from './extension'

function getInlineMenuItems(editor: Editor<EditorExtension>) {
  return {
    bold: {
      isActive: editor.marks.bold.isActive(),
      canExec: editor.commands.toggleBold.canExec(),
      command: () => editor.commands.toggleBold(),
    },
    italic: {
      isActive: editor.marks.italic.isActive(),
      canExec: editor.commands.toggleItalic.canExec(),
      command: () => editor.commands.toggleItalic(),
    },
    underline: {
      isActive: editor.marks.underline.isActive(),
      canExec: editor.commands.toggleUnderline.canExec(),
      command: () => editor.commands.toggleUnderline(),
    },
    strike: {
      isActive: editor.marks.strike.isActive(),
      canExec: editor.commands.toggleStrike.canExec(),
      command: () => editor.commands.toggleStrike(),
    },
    code: {
      isActive: editor.marks.code.isActive(),
      canExec: editor.commands.toggleCode.canExec(),
      command: () => editor.commands.toggleCode(),
    },
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
  const editor = useEditor<EditorExtension>({ update: true })
  const items = createMemo(() => getInlineMenuItems(editor()))

  const [linkMenuOpen, setLinkMenuOpen] = createSignal(false)
  const [linkValue, setLinkValue] = createSignal('')

  createEffect(() => {
    if (linkMenuOpen()) {
      setLinkValue(items().link.currentLink ?? '')
    }
  })

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor().commands.addLink({ href })
    } else {
      editor().commands.removeLink()
    }

    setLinkMenuOpen(false)
    setLinkValue('')
    editor().focus()
  }

  const handleFormSubmit = (
    event: SubmitEvent & { currentTarget: HTMLFormElement },
  ) => {
    event.preventDefault()
    const href = linkValue().trim()
    handleLinkUpdate(href || undefined)
  }

  return (
    <>
      <InlinePopover
        data-testid="inline-menu-main"
        class="CSS_INLINE_MENU_MAIN"
        onOpenChange={(event) => {
          if (!event.detail) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Button
          pressed={() => items().bold.isActive}
          disabled={() => !items().bold.canExec}
          onClick={() => items().bold.command()}
          tooltip="Bold"
        >
          <div class="CSS_ICON_BOLD" />
        </Button>

        <Button
          pressed={() => items().italic.isActive}
          disabled={() => !items().italic.canExec}
          onClick={() => items().italic.command()}
          tooltip="Italic"
        >
          <div class="CSS_ICON_ITALIC" />
        </Button>

        <Button
          pressed={() => items().underline.isActive}
          disabled={() => !items().underline.canExec}
          onClick={() => items().underline.command()}
          tooltip="Underline"
        >
          <div class="CSS_ICON_UNDERLINE" />
        </Button>

        <Button
          pressed={() => items().strike.isActive}
          disabled={() => !items().strike.canExec}
          onClick={() => items().strike.command()}
          tooltip="Strikethrough"
        >
          <div class="CSS_ICON_STRIKE" />
        </Button>

        <Button
          pressed={() => items().code.isActive}
          disabled={() => !items().code.canExec}
          onClick={() => items().code.command()}
          tooltip="Code"
        >
          <div class="CSS_ICON_CODE" />
        </Button>

        <Show when={items().link.canExec}>
          <Button
            pressed={() => items().link.isActive}
            onClick={() => {
              items().link.command()
              setLinkMenuOpen((open) => !open)
            }}
            tooltip="Link"
          >
            <div class="CSS_ICON_LINK" />
          </Button>
        </Show>
      </InlinePopover>

      <InlinePopover
        placement="bottom"
        defaultOpen={false}
        open={linkMenuOpen()}
        onOpenChange={(event) => setLinkMenuOpen(event.detail)}
        data-testid="inline-menu-link"
        class="CSS_INLINE_MENU_LINK"
      >
        <Show when={linkMenuOpen()}>
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Paste the link..."
              value={linkValue()}
              onInput={(event) => setLinkValue(event.currentTarget.value)}
              class="CSS_INLINE_MENU_LINK_INPUT"
            />
          </form>
        </Show>
        <Show when={items().link.isActive}>
          <button
            type="button"
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            class="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"
          >
            Remove link
          </button>
        </Show>
      </InlinePopover>
    </>
  )
}
