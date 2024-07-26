export function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v != null
}
