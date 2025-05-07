/**
 * Check if `subset` is a subset of `superset`.
 *
 * @internal
 */
export function isSubset(
  subset: Record<string, unknown>,
  superset: Record<string, unknown>,
): boolean {
  return Object.keys(subset).every((key) => subset[key] === superset[key])
}
