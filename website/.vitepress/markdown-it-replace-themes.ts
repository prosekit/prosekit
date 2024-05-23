import fs from 'node:fs'

import { replaceThemes } from '@prosekit/themes/dist'
import { type MarkdownRenderer as MarkdownIt } from 'vitepress'

/**
 * Alter the text content of fence code blocks and replace themes to tailwindcss class names.
 *
 * Based on https://github.com/vuejs/vitepress/blob/11f4c9aee36127566b7f09dcd57878c3f6a7da0a/src/node/markdown/plugins/snippet.ts#L152
 */
export function replaceThemesPlugin(md: MarkdownIt) {
  const fence = md.renderer.rules.fence
  if (!fence) {
    throw new Error('fence renderer is not found')
  }

  type RenderRule = typeof fence
  type Token = Parameters<RenderRule>[0][number]

  const newFence: RenderRule = (...args) => {
    const [tokens, idx] = args
    const env = args[3] as { includes?: string[] }

    const token = tokens[idx] as Token & { src?: string[] }
    const [src, regionName] = token.src ?? []

    // If it's just a normal fence token, replace its content directly.
    if (!src) {
      token.content = replaceThemes(token.content)
      return fence(...args)
    }

    // Don't override snippets with regions, since we could mess up line numbers
    if (regionName) {
      return fence(...args)
    }

    // An array provided by vitepress so that it can refresh content when source
    // files change.
    const includes = env.includes

    if (includes) {
      includes.push(src)
    }

    const isAFile = fs.statSync(src).isFile()
    if (!fs.existsSync(src) || !isAFile) {
      token.content = isAFile
        ? `Code snippet path not found: ${src}`
        : `Invalid code snippet option`
      token.info = ''
      return fence(...args)
    }

    const content = fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n')

    token.src = undefined
    token.content = replaceThemes(content)
    return fence(...args)
  }

  md.renderer.rules.fence = newFence
}
