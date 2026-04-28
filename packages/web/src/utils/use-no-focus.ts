import { onMount, type HostElement } from '@aria-ui/core'

export function useNoFocus(host: HostElement): void {
  onMount(host, () => {
    host.tabIndex = -1
  })
}
