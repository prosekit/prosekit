/**
 * Splits text into chunks based on regex matches, preserving both matched and unmatched segments.
 * Returns an array of tuples where each tuple contains a text segment and either the match data
 * (for matched segments) or undefined (for unmatched segments).
 */
export function splitTextByRegex(
  text: string,
  regex: RegExp,
): Array<[string, RegExpExecArray | undefined]> | undefined {
  regex.lastIndex = 0

  const chunks: Array<[string, RegExpExecArray | undefined]> = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let matched = false

  while ((match = regex.exec(text))) {
    const start = match.index
    const end = regex.lastIndex

    // Push the unmatched prefix, if any.
    if (start > lastIndex) {
      chunks.push([text.slice(lastIndex, start), undefined])
    }

    // Push the matched segment.
    chunks.push([text.slice(start, end), match])
    matched = true

    if (lastIndex === end) {
      // Safeguard against zero-width matches that would otherwise cause an infinite loop.
      return
    }
    lastIndex = end
  }

  if (matched && lastIndex < text.length) {
    chunks.push([text.slice(lastIndex), undefined])
  }

  regex.lastIndex = 0

  return matched ? chunks : undefined
}
