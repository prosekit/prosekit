/**
 * Splits text into chunks based on regex matches, preserving both matched and unmatched segments.
 * Returns an array of tuples where each tuple contains a text segment and either the match data
 * (for matched segments) or undefined (for unmatched segments).
 */
export function splitTextByRegex(text: string, regex: RegExp): Array<[text: string, match: RegExpExecArray | undefined]> | undefined {
  let match: RegExpExecArray | undefined | null
  let matched = false
  let lastIndex = 0
  let chunks: Array<[text: string, match: RegExpExecArray | undefined]> = []

  regex.lastIndex = 0

  while (true) {
    match = regex.exec(text)
    if (!match) {
      if (matched && lastIndex < text.length) {
        chunks.push([text.slice(lastIndex), undefined])
      }
      break
    }
    matched = true

    let matchStart = match.index
    let matchEnd = regex.lastIndex

    if (matchStart > lastIndex) {
      chunks.push([text.slice(lastIndex, matchStart), undefined])
    }
    if (matchEnd > matchStart) {
      chunks.push([text.slice(matchStart, matchEnd), match])
    }

    lastIndex = matchEnd
  }

  regex.lastIndex = 0

  return matched ? chunks : undefined
}
