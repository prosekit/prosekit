// Force the prop in props to be treated as a properties instead of an attribute.
export function forceProps<T extends Record<string, any>>(props: T): T {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      if (key === 'children' || key === 'ref' || key.includes(':')) {
        return [key, value]
      } else {
        return [`prop:${key}`, value]
      }
    }),
  ) as T
}
