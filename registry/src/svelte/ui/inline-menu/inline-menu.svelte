<script lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/svelte'
import { InlinePopover } from 'prosekit/svelte/inline-popover'

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
  const from = state.selection.$from
  const marks = from.marksAcross(from)
  if (!marks) {
    return
  }
  for (const mark of marks) {
    if (mark.type.name === 'link') {
      return (mark.attrs as LinkAttrs).href
    }
  }
}

const editor = useEditor<BasicExtension>()
const items = useEditorDerivedValue(getInlineMenuItems)

let linkMenuOpen = $state(false)
function toggleLinkMenuOpen() {
  linkMenuOpen = !linkMenuOpen
}

function handleLinkUpdate(href?: string) {
  if (href) {
    $editor.commands.addLink({ href })
  } else {
    $editor.commands.removeLink()
  }

  linkMenuOpen = false
  $editor.focus()
}
</script>

<InlinePopover
  data-testid="inline-menu-main"
  class="CSS_INLINE_MENU_MAIN"
  onOpenChange={(open) => {
    if (!open) linkMenuOpen = false
  }}
>
  {#if $items.bold}
    <Button
      pressed={$items.bold.isActive}
      disabled={!$items.bold.canExec}
      onClick={$items.bold.command}
      tooltip="Bold"
    >
      <div class="CSS_ICON_BOLD"></div>
    </Button>
  {/if}
  {#if $items.italic}
    <Button
      pressed={$items.italic.isActive}
      disabled={!$items.italic.canExec}
      onClick={$items.italic.command}
      tooltip="Italic"
    >
      <div class="CSS_ICON_ITALIC"></div>
    </Button>
  {/if}
  {#if $items.underline}
    <Button
      pressed={$items.underline.isActive}
      disabled={!$items.underline.canExec}
      onClick={$items.underline.command}
      tooltip="Underline"
    >
      <div class="CSS_ICON_UNDERLINE"></div>
    </Button>
  {/if}
  {#if $items.strike}
    <Button
      pressed={$items.strike.isActive}
      disabled={!$items.strike.canExec}
      onClick={$items.strike.command}
      tooltip="Strikethrough"
    >
      <div class="CSS_ICON_STRIKETHROUGH"></div>
    </Button>
  {/if}
  {#if $items.code}
    <Button
      pressed={$items.code.isActive}
      disabled={!$items.code.canExec}
      onClick={$items.code.command}
      tooltip="Code"
    >
      <div class="CSS_ICON_CODE"></div>
    </Button>
  {/if}
  {#if $items.link?.canExec && $items.link}
    <Button
      pressed={$items.link.isActive}
      onClick={() => {
        $items.link!.command()
        toggleLinkMenuOpen()
      }}
      tooltip="Link"
    >
      <div class="CSS_ICON_LINK"></div>
    </Button>
  {/if}
</InlinePopover>

<InlinePopover
  placement="bottom"
  defaultOpen={false}
  open={linkMenuOpen}
  data-testid="inline-menu-link"
  class="CSS_INLINE_MENU_LINK"
  onOpenChange={(open) => {
    linkMenuOpen = open
  }}
>
  {#if linkMenuOpen && $items.link}
    <form
      onsubmit={(event) => {
        event.preventDefault()
        const target = event.target as HTMLFormElement | null
        const href = target?.querySelector('input')?.value?.trim()
        handleLinkUpdate(href)
      }}
    >
      <input
        placeholder="Paste the link..."
        value={$items.link.currentLink || ''}
        class="CSS_INLINE_MENU_LINK_INPUT"
      />
    </form>
  {/if}
  {#if $items.link?.isActive}
    <button
      class="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"
      onclick={() => handleLinkUpdate()}
      onmousedown={(e) => e.preventDefault()}
    >
      Remove link
    </button>
  {/if}
</InlinePopover>
