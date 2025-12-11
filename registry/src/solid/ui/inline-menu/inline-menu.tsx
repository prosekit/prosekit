import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import {
  useEditor,
  useEditorDerivedValue,
} from 'prosekit/solid'
import { InlinePopover } from 'prosekit/solid/inline-popover'
import {
  createSignal,
  Show,
  type JSX,
} from 'solid-js'

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

export default function InlineMenu(): JSX.Element {
  const editor = useEditor<BasicExtension>()
  const items = useEditorDerivedValue(getInlineMenuItems)

  const [linkMenuOpen, setLinkMenuOpen] = createSignal(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor().commands.addLink({ href })
    } else {
      editor().commands.removeLink()
    }

    setLinkMenuOpen(false)
    editor().focus()
  }

  return (
    <>
      <InlinePopover
        attr:data-testid="inline-menu-main"
        class="CSS_INLINE_MENU_MAIN"
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Show when={items().bold}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Bold"
            >
              <div class="CSS_ICON_BOLD"></div>
            </Button>
          )}
        </Show>
        <Show when={items().italic}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Italic"
            >
              <div class="CSS_ICON_ITALIC"></div>
            </Button>
          )}
        </Show>
        <Show when={items().underline}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Underline"
            >
              <div class="CSS_ICON_UNDERLINE"></div>
            </Button>
          )}
        </Show>
        <Show when={items().strike}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Strikethrough"
            >
              <div class="CSS_ICON_STRIKETHROUGH"></div>
            </Button>
          )}
        </Show>
        <Show when={items().code}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Code"
            >
              <div class="CSS_ICON_CODE"></div>
            </Button>
          )}
        </Show>
        <Show when={items().link?.canExec && items().link}>
          {(item) => (
            <Button
              pressed={item().isActive}
              onClick={() => {
                item().command()
                toggleLinkMenuOpen()
              }}
              tooltip="Link"
            >
              <div class="CSS_ICON_LINK"></div>
            </Button>
          )}
        </Show>
      </InlinePopover>

      <Show when={items().link}>
        {(item) => (
          <InlinePopover
            placement="bottom"
            defaultOpen={false}
            open={linkMenuOpen()}
            onOpenChange={setLinkMenuOpen}
            attr:data-testid="inline-menu-link"
            class="CSS_INLINE_MENU_LINK"
          >
            <Show when={linkMenuOpen()}>
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
                  value={item().currentLink || ''}
                  class="CSS_INLINE_MENU_LINK_INPUT"
                />
              </form>
            </Show>
            <Show when={item().isActive}>
              <button
                onClick={() => handleLinkUpdate()}
                onMouseDown={(event) => event.preventDefault()}
                class="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"
              >
                Remove link
              </button>
            </Show>
          </InlinePopover>
        )}
      </Show>
    </>
  )
}
