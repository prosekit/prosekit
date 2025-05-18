export function sortObject<T extends Record<string, any>>(obj: T): T {
  const newObj: Record<string, any> = {}
  const keys = Object.keys(obj)
  for (const key of keys.sort()) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    newObj[key] = obj[key]
  }
  return newObj as T
}
