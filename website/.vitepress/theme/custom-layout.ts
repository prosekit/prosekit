import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, watch } from 'vue'

import { useScrolled } from './use-scrolled'

export const CustomLayout = defineComponent(() => {
  const scrolled = useScrolled()

  watch(scrolled, () => {
    updateClassName(scrolled.value)
  })

  return () => h(DefaultTheme.Layout)
})

function updateClassName(scrolled: boolean) {
  if (scrolled) {
    document.body.classList.add('scrolled')
  } else {
    document.body.classList.remove('scrolled')
  }
}
