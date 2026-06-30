/**
 * Builds the query string from the regex match found before the cursor. When
 * the regex has a capturing group, the first group is used as the query (the
 * empty string if the group did not participate, e.g. a bare trigger like
 * `[[`); otherwise the whole match is used. The result is trimmed, but its
 * casing and punctuation are preserved.
 *
 * Case-insensitive matching lives in the item filter (see `defaultItemFilter`),
 * not here, so the query handed to consumers keeps what the user typed.
 */
export function defaultQueryBuilder(match: RegExpExecArray): string {
  const query = match.length > 1 ? (match[1] ?? '') : match[0]
  return query.trim()
}
