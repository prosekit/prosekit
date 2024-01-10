import 'prosekit/basic/typography.css'
import 'virtual:uno.css'
import './style.css'

import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TwoSlashFloatingVue from 'vitepress-plugin-twoslash/client'

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }: EnhanceAppContext) => {
    app.use(TwoSlashFloatingVue)
  },
} satisfies Theme
