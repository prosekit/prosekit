import type { HostElement } from '@aria-ui-v2/core'
import { useEffect } from '@aria-ui-v2/core'

export function useAriaDisabled(
  host: HostElement,
  getAriaDisabled: () => boolean,
): VoidFunction {
  return useEffect(host, () => {
    host.ariaDisabled = getAriaDisabled() ? 'true' : null
  })
}

export function useAriaExpanded(
  host: HostElement,
  getAriaExpanded: () => boolean | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const ariaExpanded = getAriaExpanded()
    host.ariaExpanded = ariaExpanded === true ? 'true' : ariaExpanded === false ? 'false' : null
  })
}

export function useAriaControls(
  host: HostElement,
  getAriaControls: () => string | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const ariaControls = getAriaControls()
    if (ariaControls) {
      host.setAttribute('aria-controls', ariaControls)
    } else {
      host.removeAttribute('aria-controls')
    }
  })
}

export function useAriaDescribedBy(
  host: HostElement,
  getAriaDescribedBy: () => string | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const ariaDescribedBy = getAriaDescribedBy()
    if (ariaDescribedBy) {
      host.setAttribute('aria-describedby', ariaDescribedBy)
    } else {
      host.removeAttribute('aria-describedby')
    }
  })
}
