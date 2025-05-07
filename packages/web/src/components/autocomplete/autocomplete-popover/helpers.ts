export function defaultQueryBuilder(match: RegExpExecArray): string {
  return match[0]
    .toLowerCase()
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, '')
    .replace(/\s\s+/g, ' ')
    .trim()
}
