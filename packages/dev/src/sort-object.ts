export function sortObject<T extends Record<string, any>>(obj: T): T {
  const newObj: Record<string, any> = {}
  const keys = Object.keys(obj)
  for (const key of keys.sort()) {
    newObj[key] = obj[key]
  }
  return newObj as T
}
