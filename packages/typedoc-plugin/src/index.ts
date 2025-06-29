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

        page.contents = fixProseMirrorLinks(page.contents)
      }
    },
  )

  // Define the markdown theme
  app.renderer.defineTheme('my-markdown-theme', MyMarkdownTheme)
}

// https://github.com/ProseMirror/prosemirror-model/pull/89
function fixProseMirrorLinks(content: string) {
  return content.replaceAll(
    'https://prosemirror.net/docs/ref/#model.Node%5EtextBetween',
    'https://prosemirror.net/docs/ref/#model.Node.textBetween',
  ).replaceAll(
    'https://prosemirror.net/docs/ref/#model.Node%5EtextContent',
    'https://prosemirror.net/docs/ref/#model.Node.textContent',
  ).replaceAll(
    'https://prosemirror.net/docs/ref/#model.NodeSpec%5EleafText',
    'https://prosemirror.net/docs/ref/#model.NodeSpec.leafText',
  ).replaceAll(
    'https://prosemirror.net/docs/ref/#model.ParseRule.context',
    'https://prosemirror.net/docs/ref/',
  ).replaceAll(
    'https://prosemirror.net/docs/ref/#model.ParseRule.getAttrs',
    'https://prosemirror.net/docs/ref/',
  ).replaceAll(
    'https://prosemirror.net/docs/ref/#model.ParseRule.mark',
    'https://prosemirror.net/docs/ref/',
  ).replaceAll(
    'https://prosemirror.net/docs/ref/#model.ParseRule.priority',
    'https://prosemirror.net/docs/ref/',
  )
}
