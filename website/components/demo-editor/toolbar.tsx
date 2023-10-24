import { defineComponent, ref } from 'vue'

import { ImageUploadPopover } from './image-upload-popver'
import { ToggleButton } from './toggle-button'
import { useExampleEditorRef } from './use-example-editor'

export const Toolbar = defineComponent(() => {
  const editor = useExampleEditorRef()
  const imagePopoverOpen = ref(false)

  return () => (
    <div class="TOOLBAR">
      <ToggleButton
        available={editor.value.commands.undo.canApply()}
        onChange={() => editor.value.commands.undo()}
      >
        <div class="ICON_UNDO" />
      </ToggleButton>
      <ToggleButton
        available={editor.value.commands.redo.canApply()}
        onChange={() => editor.value.commands.redo()}
      >
        <div class="ICON_REDO" />
      </ToggleButton>
      <ToggleButton
        active={editor.value.marks.italic.isActive()}
        available={editor.value.commands.toggleItalic.canApply()}
        onChange={() => editor.value.commands.toggleItalic()}
      >
        <div class="ICON_ITALIC" />
      </ToggleButton>
      <ToggleButton
        active={editor.value.marks.bold.isActive()}
        available={editor.value.commands.toggleBold.canApply()}
        onChange={() => editor.value.commands.toggleBold()}
      >
        <div class="ICON_BOLD" />
      </ToggleButton>
      <ToggleButton
        active={editor.value.nodes.heading.isActive({ level: 1 })}
        available={editor.value.commands.toggleHeading.canApply({ level: 1 })}
        onChange={() => editor.value.commands.toggleHeading({ level: 1 })}
      >
        <div class="ICON_H1" />
      </ToggleButton>
      <ToggleButton
        active={editor.value.nodes.heading.isActive({ level: 2 })}
        available={editor.value.commands.toggleHeading.canApply({ level: 2 })}
        onChange={() => editor.value.commands.toggleHeading({ level: 2 })}
      >
        <div class="ICON_H2" />
      </ToggleButton>
      <ToggleButton
        active={editor.value.nodes.heading.isActive({ level: 3 })}
        available={editor.value.commands.toggleHeading.canApply({ level: 3 })}
        onChange={() => editor.value.commands.toggleHeading({ level: 3 })}
      >
        <div class="ICON_H3" />
      </ToggleButton>
      <ImageUploadPopover
        open={imagePopoverOpen.value}
        onClose={() => {
          imagePopoverOpen.value = false
        }}
      >
        <ToggleButton
          active={false}
          available={true}
          onChange={() => {
            imagePopoverOpen.value = !imagePopoverOpen.value
          }}
        >
          <div class="ICON_IMAGE" />
        </ToggleButton>
      </ImageUploadPopover>
    </div>
  )
})
