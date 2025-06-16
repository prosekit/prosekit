import { ReflectionKind } from 'typedoc'
import {
  MarkdownPageEvent,
  type MarkdownApplication,
} from 'typedoc-plugin-markdown'

import { MyMarkdownTheme } from './markdown-theme'

export function load(app: MarkdownApplication) {
  console.log('[typedoc-plugin-md-v2] load 5:', app)

  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    /** @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page */
    (page) => {
      /**
       * Update page.frontmatter object to match the requirements of Astro Starlight.
       */
      const name = page.model.name

      if (name) {
        page.frontmatter = {
          DEBUG1: 'DEBUG1_VALUE',
          // e.g add a title
          title: name,
          sidebar: {
            label: name.replace(/^@?prosekit\//, ''),
          },
          // spread the existing frontmatter
          ...page.frontmatter,
        }
      }
    },
  )

  app.renderer.markdownHooks.on(
    'page.begin',
    () => `**Generated using \`page.begin\` hook**`,
  )

  app.renderer.markdownHooks.on(
    'page.end',
    () => `**Generated using \`page.end\` hook**`,
  )

  app.renderer.markdownHooks.on(
    'content.begin',
    () => `**Generated using \`content.begin\` hook**`,
  )

  app.renderer.markdownHooks.on(
    'index.page.begin',
    () => `**Generated using \`index.page.begin\` hook**`,
  )

  app.renderer.markdownHooks.on(
    'index.page.end',
    () => `**Generated using \`index.page.end\` hook**`,
  )

  // Define the markdown theme
  app.renderer.defineTheme('my-markdown', MyMarkdownTheme)
}
