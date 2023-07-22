import { clsx } from 'clsx'
import { defineClientComponent } from 'vitepress'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

const App = defineClientComponent(async () => {
  const mod = await import('prosekit-example-vue-lib')
  return mod.App
})

export const DemoEditor = defineComponent(() => {
  const { isDark } = useData()

  return () =>
    h(
      'div',
      {
        class: clsx(
          'w-full flex flex-col items-center p-4',
          isDark.value ? 'dark' : null,
        ),
      },
      h('div', { class: 'max-w-full w-[500px] h-[400px]' }, h(App)),
    )
})
