import diffableHtml from 'diffable-html'

export function formatHTML(html: string): string {
  return diffableHtml(html, {
    sortAttributes: (names) => names.sort(),
  })
}
