import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { defineComponent, h, ref, watchPostEffect } from 'vue'

import { addExampleExtension } from './extension'
import { SlashMenu } from './slash-menu'
import { TagMenu } from './tag-menu'
import { UserMenu } from './user-menu'

export const Editor = defineComponent({
  setup() {
    const editor = createEditor({ extension: addExampleExtension() })
    const editorRef = ref<HTMLDivElement | null>(null)
    watchPostEffect(() => editor.mount(editorRef.value))

    return {
      editor,
      editorRef,
    }
  },
  render() {
    return h(
      'div',
      { class: 'flex flex-col w-full' },
      h(ProseKit, { editor: this.editor }, [
        h('div', { ref: 'editorRef', class: 'EDITOR_CONTENT' }),
        h(UserMenu),
        h(TagMenu),
        h(SlashMenu),
      ]),
    )
  },
})
