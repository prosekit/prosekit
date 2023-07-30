export function uniqPush<T>(prev: readonly T[], next: readonly T[]): T[] {
  const result = [...prev]

  for (const item of next) {
    if (!result.includes(item)) {
      result.push(item)
    }
  }
  return result
}

export function uniqRemove<T>(prev: T[], next: T[]) {
  const result = [...prev]

  for (const item of next) {
    const index = result.indexOf(item)
    if (index !== -1) {
      result.splice(index, 1)
    }
  }
  return result
}
