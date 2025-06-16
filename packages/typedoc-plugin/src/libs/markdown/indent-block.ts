export function indentBlock(content: string) {
  const lines = content.split('\n');
  return lines
    .filter((line) => Boolean(line.length))
    .map((line) => `    ${line}`)
    .join('\n');
}
