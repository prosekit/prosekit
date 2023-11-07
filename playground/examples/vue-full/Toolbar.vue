<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { ref } from 'vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './ImageUploadPopover.vue'
import ToggleButton from './ToggleButton.vue'

const editor = useEditor<EditorExtension>({ update: true })

const imagePopoverOpen = ref(false)
const closeImagePopover = () => {
  imagePopoverOpen.value = false
}
const toggleImagePopover = () => {
  imagePopoverOpen.value = !imagePopoverOpen.value
}
</script>

<template>
  <div class="TOOLBAR">
    <ToggleButton
      :available="editor.commands.undo.canApply()"
      @change="() => editor.commands.undo()"
    >
      <div className="ICON_UNDO" />
    </ToggleButton>

    <ToggleButton
      :available="editor.commands.redo.canApply()"
      @change="() => editor.commands.redo()"
    >
      <div className="ICON_REDO" />
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.bold.isActive()"
      :available="editor.commands.toggleBold.canApply()"
      @change="() => editor.commands.toggleBold()"
    >
      <div class="ICON_BOLD"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.italic.isActive()"
      :available="editor.commands.toggleItalic.canApply()"
      @change="() => editor.commands.toggleItalic()"
    >
      <div class="ICON_ITALIC"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.underline.isActive()"
      :available="editor.commands.toggleUnderline.canApply()"
      @change="() => editor.commands.toggleUnderline()"
    >
      <div class="ICON_UNDERLINE"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.strike.isActive()"
      :available="editor.commands.toggleStrike.canApply()"
      @change="() => editor.commands.toggleStrike()"
    >
      <div class="ICON_STRIKE"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.code.isActive()"
      :available="editor.commands.toggleCode.canApply()"
      @change="() => editor.commands.toggleCode()"
    >
      <div class="ICON_CODE"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 1 })"
      :available="editor.commands.toggleHeading.canApply({ level: 1 })"
      @change="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="ICON_H1"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 2 })"
      :available="editor.commands.toggleHeading.canApply({ level: 2 })"
      @change="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="ICON_H2"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 3 })"
      :available="editor.commands.toggleHeading.canApply({ level: 3 })"
      @change="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="ICON_H3"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'bullet' })"
      :available="editor.commands.toggleList.canApply({ kind: 'bullet' })"
      @change="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="ICON_LIST_BULLET"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'ordered' })"
      :available="editor.commands.toggleList.canApply({ kind: 'ordered' })"
      @change="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="ICON_LIST_ORDERED"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'task' })"
      :available="editor.commands.toggleList.canApply({ kind: 'task' })"
      @change="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="ICON_LIST_TASK"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'toggle' })"
      :available="editor.commands.toggleList.canApply({ kind: 'toggle' })"
      @change="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="ICON_LIST_TOGGLE"></div>
    </ToggleButton>

    <ImageUploadPopover :open="imagePopoverOpen" :onClose="closeImagePopover">
      <ToggleButton
        :active="false"
        :available="editor.commands.insertImage.canApply()"
        :onChange="toggleImagePopover"
      >
        <div className="ICON_IMAGE"></div>
      </ToggleButton>
    </ImageUploadPopover>
  </div>
</template>
