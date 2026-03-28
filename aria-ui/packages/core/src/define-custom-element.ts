import { createAttributePropertyNameMap, handleAttributeChanged, usePropertiesToAttributes } from './attribute.ts'
import type { AnyProps, PropDeclaration, PropsDeclaration } from './define-props.ts'
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

export function defineCustomElement<
  // TODO: We can remove the `__noProps__` hack and replace it with `object`
  Props extends AnyProps = { __noProps__: never },
>(
  setup: SetupFunction<Props>,
  props: PropsDeclaration<Props>,
): HostElementConstructor<Props> {
  const attributeNameToPropertyName = createAttributePropertyNameMap(props)
  const observedAttributes = Array.from(attributeNameToPropertyName.keys())
  const hasAttributes = observedAttributes.length > 0

  class CustomElement extends HostElement {
    static observedAttributes = observedAttributes

    readonly _store: Store<Props>

    constructor() {
      super()
      this._store = createStore(this, props)
      setup(this, this._store)
      if (hasAttributes) {
        usePropertiesToAttributes(this, this._store, props)
      }
    }

    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null,
    ): void {
      if (oldValue === newValue) return

      handleAttributeChanged(
        this._store,
        props,
        attributeNameToPropertyName,
        name,
        newValue,
      )
    }
  }

  defineGetterSetter(CustomElement, props)

  return CustomElement as HostElementConstructor<AnyProps> as HostElementConstructor<Props>
}

function defineGetterSetter(
  ElementConstructor: new () => { _store: Store<any> },
  props: Record<string, PropDeclaration<unknown>>,
) {
  for (const [prop, declaration] of Object.entries(props)) {
    Object.defineProperty(ElementConstructor.prototype, prop, {
      enumerable: true,
      configurable: false,
      get() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return (this._store[prop] as Signal<unknown>).get()
      },
      set(v: unknown) {
        {
          if (v === undefined) {
            v = declaration.default
          }
        }
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ;(this._store[prop] as Signal<unknown>).set(v)
        }
      },
    })
  }
}
