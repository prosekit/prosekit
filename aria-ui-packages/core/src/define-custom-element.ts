import type { AnyProps, PropsDeclaration } from './define-props.ts'
import { HostElement } from './host-element.ts'
import type { Signal } from './signal.ts'
import { createStore, type Store } from './store.ts'

/**
 * @internal
 */
export type HostElementConstructor<Props extends AnyProps> = new () => HostElement & Props

type SetupFunction<Props extends AnyProps> = (
  host: HostElement,
  props: Store<Props>,
) => void

/**
 * Defines a custom element constructor.
 *
 * @param options
 */
export function defineCustomElement<
  Props extends AnyProps = { __noProps__: never },
>(
  setup: SetupFunction<Props>,
  props: PropsDeclaration<Props>,
): HostElementConstructor<Props> {
  class CustomElement extends HostElement {
    readonly _store: Store<Props>

    constructor() {
      super()
      this._store = createStore(this, props)
      setup(this, this._store)
    }
  }

  defineGetterSetter(CustomElement, props)

  return CustomElement as HostElementConstructor<any> as HostElementConstructor<Props>
}

function defineGetterSetter<Props extends object>(
  ElementConstructor: new () => { _store: Store<Props> },
  props: PropsDeclaration<Props>,
) {
  for (const prop of Object.keys(props)) {
    Object.defineProperty(ElementConstructor.prototype, prop, {
      enumerable: true,
      configurable: false,
      get() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return (this._store[prop] as Signal<unknown>).get()
      },
      set(v: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ;(this._store[prop] as Signal<unknown>).set(v)
      },
    })
  }
}
