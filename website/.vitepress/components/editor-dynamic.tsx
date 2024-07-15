// @unocss-include

import { Themes } from '@prosekit/themes'
import { defineComponent, h, onMounted, shallowRef } from 'vue'

const EditorFallback = defineComponent(() => {
  return () => (
    <div class={Themes.EDITOR_VIEWPORT}>
      <div class={Themes.EDITOR_SCROLLING}>
        <div class={Themes.EDITOR_CONTENT}></div>
      </div>
    </div>
  )
})

export const EditorDynamic = defineComponent(() => {
  const comp = shallowRef()
  onMounted(async () => {
    comp.value = (await import('./vue-full/editor.vue')).default
  })
  return () => (comp.value ? h(comp.value) : h(EditorFallback))
})
