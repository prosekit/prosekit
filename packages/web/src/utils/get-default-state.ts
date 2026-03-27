import { createSignal, type PropDeclarations, type SignalState } from '@aria-ui/core'

export function getStateWithDefaults<
  Props extends Record<string, any> = Record<string, any>,
>(
  state: Partial<SignalState<Props>>,
  props: PropDeclarations<Props>,
): SignalState<Props> {
  const merged = { ...state } as SignalState<Props>

  for (const key of Object.keys(props) as (keyof Props)[]) {
    if (!merged[key]) {
      merged[key] = createSignal(props[key].default)
    }
  }

  return merged
}
