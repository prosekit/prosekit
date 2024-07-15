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
    const mod = await import('./vue-full/editor.vue')
    const viewTransition = document?.startViewTransition?.(() => void 0)
    await viewTransition?.ready
    comp.value = mod.default
  })
  return () => (comp.value ? h(comp.value) : h(EditorFallback))
})
