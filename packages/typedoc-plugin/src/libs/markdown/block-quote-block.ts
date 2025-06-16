export function blockQuoteBlock(content: string) {
  const lines = (
    content.replace(/[\r\n]{3,}/g, '\n\n').replace(/^\s+|\s+$/g, '') + '\n'
  ).split('\n');
  return lines
    .map((line) => (line.length ? `> ${line.trim()}` : '>'))
    .join('\n');
}
