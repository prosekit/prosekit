export function removeUndefinedValues<T extends object>(obj: T): T {
  const result = {} as Record<string, unknown>
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result as T
}
