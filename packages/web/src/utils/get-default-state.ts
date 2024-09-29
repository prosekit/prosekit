import {
  type PropDeclarations,
  type SignalState,
  createSignal,
} from '@aria-ui/core'

export function getStateWithDefaults<
  Props extends Record<string, any> = Record<string, any>,
>(
  state: Partial<SignalState<Props>>,
  props: PropDeclarations<Props>,
): SignalState<Props> {
  const merged = { ...state } as SignalState<any>

  for (const key of Object.keys(props)) {
    if (!merged[key]) {
      merged[key] = createSignal(props[key].default)
    }
  }

  return merged
}
