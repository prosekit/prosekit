export function uniqPush<T>(prev: readonly T[], next: readonly T[]): T[] {
  const result = [...prev]

  for (const item of next) {
    if (!result.includes(item)) {
      result.push(item)
    }
  }
  return result
}

export function uniqRemove<T>(prev: T[], next: T[]): T[] {
  const result = [...prev]

  for (const item of next) {
    const index = result.indexOf(item)
    if (index !== -1) {
      result.splice(index, 1)
    }
  }
  return result
}

/**
 * @internal
 */
export function arrayRemove<T>(array: T[], item: T): void {
  const index = array.indexOf(item)
  if (index !== -1) {
    array.splice(index, 1)
  }
}

/**
 * @internal
 */
export function arraySubstract<T>(a: T[], b: T[]): T[] {
  return a.filter((x) => !b.includes(x))
}

export function toReversed<T>(arr: T[]): T[] {
  return arr.toReversed?.() ?? [...arr].reverse()
}

function zip<T, P>(a: T[], b: P[]): [T, P][] {
  const result: [T, P][] = []
  const length = Math.min(a.length, b.length)

  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]])
  }

  return result
}

export { zip }
