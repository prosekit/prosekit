/**
 * Returns a heading in markdown format
 * @param level The level of the heading
 * @param text The text of the heading
 */
export function heading(level: number, text: string) {
  level = level > 6 ? 6 : level;
  return `${[...Array(level)].map(() => '#').join('')} ${text}`;
}
