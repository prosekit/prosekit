<script setup lang="ts">
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
const linkMenuAvailable = ref(false)

const setLinkMenuAvailable = (value: boolean) => {
  linkMenuAvailable.value = value
}
const toggleLinkMenuAvailable = () => {
  linkMenuAvailable.value = !linkMenuAvailable.value
}

const getCurrentLink = (state: EditorState): string | undefined => {
  const { $from, $to } = state.selection
  const marks = $from.marksAcross($to)
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

  linkMenuAvailable.value = false
  editor.value.focus()
}
</script>

<template>
  <InlinePopover class="INLINE_MENU_MAIN" :editor="editor">
    <Toggle
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="ICON_BOLD"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="ICON_ITALIC"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canApply()"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class="ICON_UNDERLINE"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canApply()"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class="ICON_STRIKE"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canApply()"
      @click="() => editor.commands.toggleCode()"
    >
      <div class="ICON_CODE"></div>
    </Toggle>

    <Toggle
      v-if="editor.commands.addLink.canApply({ href: '' })"
      :pressed="editor.marks.link.isActive()"
      @click="
        () => {
          editor.commands.expandLink()
          toggleLinkMenuAvailable()
        }
      "
    >
      <div class="ICON_LINK"></div>
    </Toggle>
  </InlinePopover>

  <InlinePopover
    class="INLINE_MENU_LINK"
    :editor="editor"
    :positioning="{ placement: 'bottom' }"
    :available="linkMenuAvailable"
    @openChange="setLinkMenuAvailable"
  >
    <form
      v-if="linkMenuAvailable"
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
        class="INLINE_MENU_LINK_INPUT"
      />
    </form>
    <button
      v-if="editor.marks.link.isActive()"
      @click="handleLinkUpdate()"
      @mousedown.prevent
      class="INLINE_MENU_LINK_REMOVE_BUTTON"
    >
      Remove link
    </button>
  </InlinePopover>
</template>
