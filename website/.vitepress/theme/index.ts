import 'virtual:uno.css'

import './nav-bar.css'

import DefaultTheme from 'vitepress/theme'

import { CustomLayout } from './custom-layout'

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
}
