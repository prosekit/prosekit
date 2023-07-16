export type QueryBuilder = (
  match: RegExpMatchArray,
  matchAfter?: RegExpMatchArray | null,
) => string
