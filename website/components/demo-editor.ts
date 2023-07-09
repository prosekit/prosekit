import { App } from 'prosekit-example-vue-lib'
import 'prosekit-example-vue-lib/style.css'
import { defineComponent, h } from 'vue'
import './demo-editor.css'

export const DemoEditor = defineComponent(() => {
  return () => h('div', { class: 'demo-editor' }, h(App))
})
