<script lang="ts">
import { Themes } from '@prosekit/themes'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/svelte'
import { InlinePopover } from 'prosekit/svelte/inline-popover'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
let linkMenuOpen = false

const setLinkMenuOpen = (value: boolean) => {
  linkMenuOpen = value
}
const toggleLinkMenuOpen = () => {
  linkMenuOpen = !linkMenuOpen
}

const getCurrentLink = (state: EditorState): string | undefined => {
  const { $from } = state.selection
  const marks = $from.marksAcross($from)
  if (!marks) {
    return
  }
  for (const mark of marks) {
    if (mark.type.name === 'link') {
      return mark.attrs.href
    }
  }
}

const handleLinkUpdate = (href?: string) => {
  if (href) {
    $editor.commands.addLink({ href })
  } else {
    $editor.commands.removeLink()
  }

  linkMenuOpen = false
  $editor.focus()
}

const handleSubmit = (event: Event) => {
  const target = event.target as HTMLFormElement | null
  const href = target?.querySelector('input')?.value?.trim()
  handleLinkUpdate(href)
}
</script>

<InlinePopover data-testid="inline-menu-main" class={Themes.INLINE_MENU_MAIN}>
  <Button
    pressed={$editor.marks.bold.isActive()}
    disabled={!$editor.commands.toggleBold.canExec()}
    tooltip="Bold"
    onClick={() => $editor.commands.toggleBold()}
  >
    <div class={Themes.ICON_BOLD}></div>
  </Button>

  <Button
    pressed={$editor.marks.italic.isActive()}
    disabled={!$editor.commands.toggleItalic.canExec()}
    onClick={() => $editor.commands.toggleItalic()}
    tooltip="Italic"
  >
    <div class={Themes.ICON_ITALIC}></div>
  </Button>

  <Button
    pressed={$editor.marks.underline.isActive()}
    disabled={!$editor.commands.toggleUnderline.canExec()}
    onClick={() => $editor.commands.toggleUnderline()}
    tooltip="Underline"
  >
    <div class={Themes.ICON_UNDERLINE}></div>
  </Button>

  <Button
    pressed={$editor.marks.strike.isActive()}
    disabled={!$editor.commands.toggleStrike.canExec()}
    onClick={() => $editor.commands.toggleStrike()}
    tooltip="Strike"
  >
    <div class={Themes.ICON_STRIKE}></div>
  </Button>

  <Button
    pressed={$editor.marks.code.isActive()}
    disabled={!$editor.commands.toggleCode.canExec()}
    onClick={() => $editor.commands.toggleCode()}
    tooltip="Code"
  >
    <div class={Themes.ICON_CODE}></div>
  </Button>

  {#if $editor.commands.addLink.canExec({ href: '' })}
    <Button
      pressed={$editor.marks.link.isActive()}
      onClick={() => {
        $editor.commands.expandLink()
        toggleLinkMenuOpen()
      }}
      tooltip="Link"
    >
      <div class={Themes.ICON_LINK}></div>
    </Button>
  {/if}
</InlinePopover>

<InlinePopover
  placement="bottom"
  defaultOpen={false}
  open={linkMenuOpen}
  onOpenChange={setLinkMenuOpen}
  data-testid="inline-menu-link"
  class={Themes.INLINE_MENU_LINK}
>
  {#if linkMenuOpen}
    <form on:submit|preventDefault={handleSubmit}>
      <input
        placeholder="Paste the link..."
        value={getCurrentLink($editor.state) || ''}
        class={Themes.INLINE_MENU_LINK_INPUT}
      />
    </form>
  {/if}

  {#if $editor.marks.link.isActive()}
    <button
      on:click={() => handleLinkUpdate()}
      on:mousedown|preventDefault
      class={Themes.INLINE_MENU_LINK_REMOVE_BUTTON}
    >
      Remove link
    </button>
  {/if}
</InlinePopover>
