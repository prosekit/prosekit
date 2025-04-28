<script setup lang="ts">
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
const linkMenuOpen = ref(false)

function setLinkMenuOpen(value: boolean) {
  linkMenuOpen.value = value
}
function toggleLinkMenuOpen() {
  linkMenuOpen.value = !linkMenuOpen.value
}

function getCurrentLink(state: EditorState): string | undefined {
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
  >
    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="CSS_ICON_BOLD" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      tooltip="Italic"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="CSS_ICON_ITALIC" />
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canExec()"
      tooltip="Underline"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class="CSS_ICON_UNDERLINE" />
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canExec()"
      tooltip="Strike"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class="CSS_ICON_STRIKE" />
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canExec()"
      tooltip="Code"
      @click="() => editor.commands.toggleCode()"
    >
      <div class="CSS_ICON_CODE" />
    </Button>

    <Button
      v-if="editor.commands.addLink.canExec({ href: '' })"
      :pressed="editor.marks.link.isActive()"
      tooltip="Link"
      @click="
        () => {
          editor.commands.expandLink()
          toggleLinkMenuOpen()
        }
      "
    >
      <div class="CSS_ICON_LINK" />
    </Button>
  </InlinePopover>

  <InlinePopover
    :placement="'bottom'"
    :default-open="false"
    :open="linkMenuOpen"
    data-testid="inline-menu-link"
    class="CSS_INLINE_MENU_LINK"
    @open-change="setLinkMenuOpen"
  >
    <form
      v-if="linkMenuOpen"
      @submit.prevent="
        (event) => {
          const target = event.target as HTMLFormElement | null
          const href = target?.querySelector('input')?.value?.trim()
          handleLinkUpdate(href)
        }
      "
    >
      <input
        placeholder="Paste the link..."
        :defaultValue="getCurrentLink(editor.state)"
        class="CSS_INLINE_MENU_LINK_INPUT"
      />
    </form>
    <button
      v-if="editor.marks.link.isActive()"
      class="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"
      @click="handleLinkUpdate()"
      @mousedown.prevent
    >
      Remove link
    </button>
  </InlinePopover>
</template>
