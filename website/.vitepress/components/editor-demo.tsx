// @unocss-include

import { Themes } from '@prosekit/themes'
import clsx from 'clsx'
import { defineComponent, onMounted, ref, shallowRef, Transition } from 'vue'

import { useDarkMode } from './use-dark-mode'

const EditorFallback = defineComponent(() => {
  return () => (
    <div class={Themes.EDITOR_VIEWPORT}>
      <div class={Themes.EDITOR_SCROLLING}>
        <div class={Themes.EDITOR_CONTENT}></div>
      </div>
    </div>
  )
})

async function loadEditor() {
  const mod = await import('./vue-full/editor.vue')
  return mod.default
}

type EditorComponent = Awaited<ReturnType<typeof loadEditor>>

export const EditorDemo = defineComponent(() => {
  const isDark = useDarkMode()

  const comp = shallowRef<EditorComponent>()
  const key = ref(1)

  onMounted(async () => {
    comp.value = await loadEditor()
    key.value++
  })

  return () => (
    <div class="relative mx-0 mx-auto my-10 h-100 max-w-full w-[760px] flex flex-col items-center lg:my-15">
      <Transition
        enterFromClass="opacity-0"
        leaveToClass="opacity-0"
        leaveActiveClass="transition-opacity transition-duration-300"
        enterActiveClass="transition-opacity transition-duration-300"
      >
        <div
          class={clsx(
            'absolute inset-0 flex flex-col items-center',
            isDark.value ? 'dark' : null,
          )}
          key={key.value}
        >
          {comp.value ? <comp.value /> : <EditorFallback />}
        </div>
      </Transition>
    </div>
  )
})
