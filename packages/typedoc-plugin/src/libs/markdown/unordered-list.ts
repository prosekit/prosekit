export function unorderedList(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}
