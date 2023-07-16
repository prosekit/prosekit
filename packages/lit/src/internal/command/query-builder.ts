export type QueryBuilder = (
  match: RegExpMatchArray,
  matchAfter?: RegExpMatchArray | null,
) => string

export const defaultQueryBuilder: QueryBuilder = (match, matchAfter) => {
  const query = match[0] + (matchAfter?.[0] ?? '')
  return query
    .toLowerCase()
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, '')
    .replace(/\s\s+/g, ' ')
    .trim()
}
