export function cache<T>(fn: () => T): () => T {
  let result: T | undefined = undefined
  return (): T => {
    if (result === undefined) {
      result = fn()
    }
    return result
  }
}
