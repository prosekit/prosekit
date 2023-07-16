import { defineClientComponent } from 'vitepress'
import { defineComponent, h } from 'vue'
import './demo-editor.css'

const App = defineClientComponent(async () => {
  const mod = await import('prosekit-example-vue-lib')
  return mod.App
})

export const DemoEditor = defineComponent(() => {
  return () => h('div', { class: 'demo-editor' }, h(App))
})
