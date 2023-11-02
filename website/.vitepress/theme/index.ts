import 'virtual:uno.css'

import './hero.css'
import './nav-bar.css'
import './plugin-tabs.css'
import './sandpack.css'

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

import { CustomLayout } from './custom-layout'

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  },
} satisfies Theme
