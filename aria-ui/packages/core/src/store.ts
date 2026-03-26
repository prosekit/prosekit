import type { AnyProps, PropsDeclaration } from './define-props.ts'
import { createSignal, type Signal } from './signal.ts'

/**
 * A collection of signals.
 *
 * @public
 */
export type Store<Props extends AnyProps> = {
  [Key in keyof Props]: Signal<Props[Key]>
}

/**
 * @internal
 */
export function createStore<Props extends AnyProps>(
  // TODO: remove this host parameter
  host: HTMLElement,
  propsDeclaration: PropsDeclaration<Props>,
): Store<Props> {
  const store: Record<string, Signal<any>> = {}

  for (const key of Object.keys(propsDeclaration)) {
    const declaration = propsDeclaration[key]
    const signal = createSignal(declaration.default)
    store[key] = signal

    // Object.defineProperty(host, key, {
    //   get: signal.get,
    //   set: signal.set,
    //   enumerable: true,
    //   configurable: false,
    // })
  }

  return store as Store<Props>
}
