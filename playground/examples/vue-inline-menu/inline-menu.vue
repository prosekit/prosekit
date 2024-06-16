<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'
import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
const linkMenuOpen = ref(false)

const setLinkMenuOpen = (value: boolean) => {
  linkMenuOpen.value = value
}
const toggleLinkMenuOpen = () => {
  linkMenuOpen.value = !linkMenuOpen.value
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
    editor.value.commands.addLink({ href })
  } else {
    editor.value.commands.removeLink()
  }

  linkMenuOpen.value = false
  editor.value.focus()
}
</script>

<template>
  <InlinePopover data-testid="inline-menu-main" :class="Themes.INLINE_MENU_MAIN">
    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
    tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div :class="Themes.ICON_BOLD"></div>
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      @click="() => editor.commands.toggleItalic()"
      tooltip="Italic"
    >
      <div :class="Themes.ICON_ITALIC"></div>
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canApply()"
      @click="() => editor.commands.toggleUnderline()"
      tooltip="Underline"
    >
      <div :class="Themes.ICON_UNDERLINE"></div>
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canApply()"
      @click="() => editor.commands.toggleStrike()"
      tooltip="Strike"
    >
      <div :class="Themes.ICON_STRIKE"></div>
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canApply()"
      @click="() => editor.commands.toggleCode()"
      tooltip="Code"
    >
      <div :class="Themes.ICON_CODE"></div>
    </Button>

    <Button
      v-if="editor.commands.addLink.canApply({ href: '' })"
      :pressed="editor.marks.link.isActive()"
      @click="
        () => {
          editor.commands.expandLink()
          toggleLinkMenuOpen()
        }
      "
      tooltip="Link"
    >
      <div :class="Themes.ICON_LINK"></div>
    </Button>
  </InlinePopover>

  <InlinePopover
    :placement="'bottom'"
    :defaultOpen="false"
    :open="linkMenuOpen"
    @openChange="setLinkMenuOpen"
    data-testid="inline-menu-link"
    :class="Themes.INLINE_MENU_LINK"
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
        :class="Themes.INLINE_MENU_LINK_INPUT"
      />
    </form>
    <button
      v-if="editor.marks.link.isActive()"
      @click="handleLinkUpdate()"
      @mousedown.prevent
      :class="Themes.INLINE_MENU_LINK_REMOVE_BUTTON"
    >
      Remove link
    </button>
  </InlinePopover>
</template>
