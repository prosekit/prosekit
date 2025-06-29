import {
  MarkdownPageEvent,
  type MarkdownApplication,
} from 'typedoc-plugin-markdown'

import { MyMarkdownTheme } from './markdown-theme'

export function load(app: MarkdownApplication) {
  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    (page) => {
      /**
       * Update page.frontmatter object to match the requirements of Astro Starlight.
       */
      const name = page.model.name

      if (name) {
        page.frontmatter = {
          title: name,
          sidebar: {
            label: name.replace(/^@?prosekit\//, ''),
          },
          // spread the existing frontmatter
          ...page.frontmatter,
        }

        if (page.filename.endsWith('.css.md')) {
          page.filename = page.filename.replace(/\.css\.md$/, '-css.md')
        }
      }
    },
  )

  // Define the markdown theme
  app.renderer.defineTheme('my-markdown-theme', MyMarkdownTheme)
}
