// @unocss-include

import { clsx } from 'clsx'
import { defineClientComponent } from 'vitepress'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

const Editor = defineClientComponent(async () => {
  const mod = await import('./vue-full/app.vue')
  return mod.default
})

export const DemoEditor = defineComponent(() => {
  const { isDark } = useData()

  return () =>
    h(
      'div',
      {
        class: clsx(
          'mx-auto mt-10 flex w-[760px] max-w-full flex-col items-center p-4',
          isDark.value ? 'dark' : null,
        ),
      },
      h(Editor),
    )
})
