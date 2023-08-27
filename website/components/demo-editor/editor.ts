import { defineComponent, h, ref, watchPostEffect } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { addExampleExtension } from './extension'
import { SlashMenu } from './slash-menu'
import { createEditor } from 'prosekit/core'
import { UserMenu } from './user-menu'
import { TagMenu } from './tag-menu'

export const Editor = defineComponent({
  setup() {
    const editor = createEditor({ extension: addExampleExtension() })
    const editorRef = ref<HTMLDivElement | null>(null)
    watchPostEffect(() => editor.mount(editorRef.value))

    return {
      editor,
      editorRef
    }
  },
  render() {
    return h(ProseKit, { editor: this.editor }, [
      h('div', { ref: 'editorRef', class: 'example-editor EDITOR_BOX' }),
      h(UserMenu),
      h(TagMenu),
      h(SlashMenu)
    ])
  }
})
