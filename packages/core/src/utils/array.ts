export function uniqPush<T>(prev: readonly T[], next: readonly T[]): T[] {
  const result = [...prev]

  for (const item of next) {
    if (!result.includes(item)) {
      result.push(item)
    }
  }
  return result
}

/**
 * @internal
 */
export function arraySubtract<T>(a: T[], b: T[]): T[] {
  return a.filter((x) => !b.includes(x))
}
