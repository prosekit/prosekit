import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { defineComponent, ref, watchPostEffect } from 'vue'

import { defineExampleExtension } from './extension'
import { SlashMenu } from './slash-menu'
import { TagMenu } from './tag-menu'
import { Toolbar } from './toolbar'
import { UserMenu } from './user-menu'

export const Editor = defineComponent({
  name: 'Editor',
  setup() {
    const editor = createEditor({ extension: defineExampleExtension() })
    const editorRef = ref<HTMLDivElement | null>(null)
    watchPostEffect(() => editor.mount(editorRef.value))

    return () => (
      <div class="flex w-full flex-col">
        <ProseKit editor={editor}>
          <Toolbar />
          <div ref={editorRef} class="EDITOR_CONTENT" />
          <UserMenu />
          <TagMenu />
          <SlashMenu />
        </ProseKit>
      </div>
    )
  },
})
