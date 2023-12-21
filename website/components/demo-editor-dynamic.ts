// @unocss-include

import { clsx } from 'clsx'
import { defineClientComponent } from 'vitepress'
import { defineComponent, h } from 'vue'

import { useDarkMode } from './use-dark-mode'

const Editor = defineClientComponent(async () => {
  const mod = await import('./vue-full/editor.vue')
  return mod.default
})

export const DemoEditor = defineComponent(() => {
  const isDark = useDarkMode()

  return () =>
    h(
      'div',
      {
        class: clsx(
          'mx-auto mt-10 flex h-[400px] w-[760px] max-w-full flex-col items-center p-4',
          isDark.value ? 'dark' : null,
        ),
      },
      h(Editor),
    )
})
