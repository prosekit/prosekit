export function unwrapDefaultExport<T>(module: T | { default: T }): T {
  // @ts-expect-error: default is not in the type
  module = (module['default'] as T) || module
  // @ts-expect-error: default is not in the type
  module = (module['default'] as T) || module
  return module as T
}
