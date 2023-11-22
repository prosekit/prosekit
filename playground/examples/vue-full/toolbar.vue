<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { ref } from 'vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.vue'
import Toggle from './toggle.vue'

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
    <Toggle
      :available="editor.commands.undo.canApply()"
      @change="() => editor.commands.undo()"
    >
      <div className="ICON_UNDO" />
    </Toggle>

    <Toggle
      :available="editor.commands.redo.canApply()"
      @change="() => editor.commands.redo()"
    >
      <div className="ICON_REDO" />
    </Toggle>

    <Toggle
      :active="editor.marks.bold.isActive()"
      :available="editor.commands.toggleBold.canApply()"
      @change="() => editor.commands.toggleBold()"
    >
      <div class="ICON_BOLD"></div>
    </Toggle>

    <Toggle
      :active="editor.marks.italic.isActive()"
      :available="editor.commands.toggleItalic.canApply()"
      @change="() => editor.commands.toggleItalic()"
    >
      <div class="ICON_ITALIC"></div>
    </Toggle>

    <Toggle
      :active="editor.marks.underline.isActive()"
      :available="editor.commands.toggleUnderline.canApply()"
      @change="() => editor.commands.toggleUnderline()"
    >
      <div class="ICON_UNDERLINE"></div>
    </Toggle>

    <Toggle
      :active="editor.marks.strike.isActive()"
      :available="editor.commands.toggleStrike.canApply()"
      @change="() => editor.commands.toggleStrike()"
    >
      <div class="ICON_STRIKE"></div>
    </Toggle>

    <Toggle
      :active="editor.marks.code.isActive()"
      :available="editor.commands.toggleCode.canApply()"
      @change="() => editor.commands.toggleCode()"
    >
      <div class="ICON_CODE"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.heading.isActive({ level: 1 })"
      :available="editor.commands.toggleHeading.canApply({ level: 1 })"
      @change="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="ICON_H1"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.heading.isActive({ level: 2 })"
      :available="editor.commands.toggleHeading.canApply({ level: 2 })"
      @change="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="ICON_H2"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.heading.isActive({ level: 3 })"
      :available="editor.commands.toggleHeading.canApply({ level: 3 })"
      @change="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="ICON_H3"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.list.isActive({ kind: 'bullet' })"
      :available="editor.commands.toggleList.canApply({ kind: 'bullet' })"
      @change="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="ICON_LIST_BULLET"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.list.isActive({ kind: 'ordered' })"
      :available="editor.commands.toggleList.canApply({ kind: 'ordered' })"
      @change="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="ICON_LIST_ORDERED"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.list.isActive({ kind: 'task' })"
      :available="editor.commands.toggleList.canApply({ kind: 'task' })"
      @change="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="ICON_LIST_TASK"></div>
    </Toggle>

    <Toggle
      :active="editor.nodes.list.isActive({ kind: 'toggle' })"
      :available="editor.commands.toggleList.canApply({ kind: 'toggle' })"
      @change="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="ICON_LIST_TOGGLE"></div>
    </Toggle>

    <ImageUploadPopover :open="imagePopoverOpen" :onClose="closeImagePopover">
      <Toggle
        :active="false"
        :available="editor.commands.insertImage.canApply()"
        :onChange="toggleImagePopover"
      >
        <div className="ICON_IMAGE"></div>
      </Toggle>
    </ImageUploadPopover>
  </div>
</template>
