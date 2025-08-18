import {
  MarkdownPageEvent,
  type MarkdownApplication,
} from 'typedoc-plugin-markdown'

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
      }
    },
  )
}
