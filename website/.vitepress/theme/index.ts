import 'prosekit/basic/typography.css'
import '@shikijs/vitepress-twoslash/style.css'

import 'virtual:uno.css'
import './style.css'

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import type {
  EnhanceAppContext,
  Theme,
} from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }: EnhanceAppContext) => {
    app.use(TwoslashFloatingVue)
  },
} satisfies Theme
