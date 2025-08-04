let id = 0

/**
 * Returns a unique id in the current process that can be used in various places.
 *
 * @internal
 *
 * @deprecated Import `getId` from `@ocavue/utils` package instead. Remove it in a future version.
 */
export function getId(): string {
  id = (id + 1) % Number.MAX_SAFE_INTEGER
  return `id:${id}`
}
