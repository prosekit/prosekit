import { type MarkdownRenderer as MarkdownIt } from 'vitepress'

import { replaceShortcuts } from '../../config/unocss-shortcut.mjs'

export function replaceShortcutsPlugin(md: MarkdownIt) {
  const fence = md.renderer.rules.fence
  if (!fence) {
    throw new Error('fence renderer is not found')
  }
  type RenderRule = typeof fence
  const newFence: RenderRule = (...args) => {
    const html = fence(...args)
    return replaceShortcuts(html)
  }
  md.renderer.rules.fence = newFence
}
