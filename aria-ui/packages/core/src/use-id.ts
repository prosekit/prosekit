import { getId } from '@ocavue/utils'

export function useId() {
  return `aria-ui-id-${getId()}`
}
