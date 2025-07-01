/**
 *  The link element
 * @param label The text to display for the link
 * @param url The url to link to
 */
export function link(label: string, url: string | null) {
  return `[${label.trim()}](${url || ''})`;
}
