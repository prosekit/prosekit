<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'

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

const editor = useEditor<BasicExtension>()
const items = useEditorDerivedValue(getInlineMenuItems)

const linkMenuOpen = ref(false)
function toggleLinkMenuOpen() {
  linkMenuOpen.value = !linkMenuOpen.value
}

function handleLinkUpdate(href?: string) {
  if (href) {
    editor.value.commands.addLink({ href })
  } else {
    editor.value.commands.removeLink()
  }

  linkMenuOpen.value = false
  editor.value.focus()
}
</script>

<template>
  <InlinePopover
    data-testid="inline-menu-main"
    class="CSS_INLINE_MENU_MAIN"
    @open-change="(open) => {
      if (!open) linkMenuOpen = false
    }"
  >
    <Button
      v-if="items.bold"
      :pressed="items.bold.isActive"
      :disabled="!items.bold.canExec"
      tooltip="Bold"
      @click="items.bold.command"
    >
      <div class="CSS_ICON_BOLD"></div>
    </Button>
    <Button
      v-if="items.italic"
      :pressed="items.italic.isActive"
      :disabled="!items.italic.canExec"
      tooltip="Italic"
      @click="items.italic.command"
    >
      <div class="CSS_ICON_ITALIC"></div>
    </Button>
    <Button
      v-if="items.underline"
      :pressed="items.underline.isActive"
      :disabled="!items.underline.canExec"
      tooltip="Underline"
      @click="items.underline.command"
    >
      <div class="CSS_ICON_UNDERLINE"></div>
    </Button>
    <Button
      v-if="items.strike"
      :pressed="items.strike.isActive"
      :disabled="!items.strike.canExec"
      tooltip="Strikethrough"
      @click="items.strike.command"
    >
      <div class="CSS_ICON_STRIKETHROUGH"></div>
    </Button>
    <Button
      v-if="items.code"
      :pressed="items.code.isActive"
      :disabled="!items.code.canExec"
      tooltip="Code"
      @click="items.code.command"
    >
      <div class="CSS_ICON_CODE"></div>
    </Button>
    <Button
      v-if="items.link?.canExec && items.link"
      :pressed="items.link.isActive"
      tooltip="Link"
      @click="() => {
        items.link!.command()
        toggleLinkMenuOpen()
      }"
    >
      <div class="CSS_ICON_LINK"></div>
    </Button>
  </InlinePopover>

  <InlinePopover
    v-if="items.link"
    placement="bottom"
    :default-open="false"
    :open="linkMenuOpen"
    data-testid="inline-menu-link"
    class="CSS_INLINE_MENU_LINK"
    @open-change="(open) => {
      linkMenuOpen = open
    }"
  >
    <form
      v-if="linkMenuOpen"
      @submit.prevent="(event) => {
        const target = event.target as HTMLFormElement | null
        const href = target?.querySelector('input')?.value?.trim()
        handleLinkUpdate(href)
      }"
    >
      <input
        placeholder="Paste the link..."
        :value="items.link.currentLink || ''"
        class="CSS_INLINE_MENU_LINK_INPUT"
      >
    </form>
    <button
      v-if="items.link.isActive"
      class="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"
      @click="() => handleLinkUpdate()"
      @mousedown.prevent
    >
      Remove link
    </button>
  </InlinePopover>
</template>
