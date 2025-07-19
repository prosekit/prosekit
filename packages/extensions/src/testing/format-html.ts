import diffableHtml from 'diffable-html'

export async function formatHTML(html: string) {
  // TODO: remove resolve
  return await Promise.resolve(diffableHtml(html))
}
