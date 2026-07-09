/**
 * Builds the query string from the regex match found before the cursor. The
 * returned query is exposed via the `queryChange` event and used by the
 * built-in item filter.
 */
export type QueryBuilder = (match: RegExpExecArray) => string

export function defaultQueryBuilder(match: RegExpExecArray): string {
  return match[0]
    .toLowerCase()
    .replaceAll(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '')
    .replaceAll(/\s{2,}/g, ' ')
    .trim()
}
