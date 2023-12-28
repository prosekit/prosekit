import 'virtual:uno.css'
import 'prosekit/basic/typography.css'
import './style.css'

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { CustomLayout } from './custom-layout'

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
} satisfies Theme
