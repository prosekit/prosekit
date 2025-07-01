export function unEscapeChars(str: string) {
  return str
    .replace(
      /(`[^`]*?)\\*([^`]*?`)/g,
      (match, p1: string, p2: string) => `${p1}${p2.replace(/\*/g, String.raw`\*`)}`,
    )
    .replace(/\\\\/g, '\\')
    .replace(/(?<!\\)\*/g, '')
    .replace(/\\</g, '<')
    .replace(/\\>/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\\_/g, '_')
    .replace(/\\{/g, '{')
    .replace(/\\}/g, '}')
    .replace(/``.*?``|(?<!\\)`/g, (match) => match.startsWith('``') ? match : '')
    .replace(/`` /g, '')
    .replace(/ ``/g, '')
    .replace(/\\`/g, '`')
    .replace(/\\\*/g, '*')
    .replace(/\\\|/g, '|')
    .replace(/\\]/g, ']')
    .replace(/\\\[/g, '[')
    .replace(/\[([^[\]]*)]\((.*?)\)/gm, '$1')
}
