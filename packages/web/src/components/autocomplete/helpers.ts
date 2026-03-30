export function defaultQueryBuilder(match: RegExpExecArray): string {
  return match[0]
    .toLowerCase()
    .replaceAll(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, '')
    .replaceAll(/\s\s+/g, ' ')
    .trim()
}
