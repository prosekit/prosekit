import type { ReferenceElement } from '@floating-ui/dom'
import type { LitElement } from 'lit'

import { getPlacement } from './get-placement'
import { defaultOptions, type PositioningOptions } from './options'
import { setFloatingStyles } from './set-floating-styles'

export function usePopover(
  host: LitElement,
  getReference: () => ReferenceElement | null,
  getPositioning: () => PositioningOptions | null,
) {
  let cleanup: VoidFunction | undefined

  const hostUpdated = () => {
    const reference = getReference()
    const positioning = { ...defaultOptions, ...getPositioning() }

    cleanup?.()
    cleanup = getPlacement(reference, host, {
      ...positioning,
      onComplete: (data) => {
        positioning?.onComplete?.(data)
        setFloatingStyles(host, { ...positioning, placement: data.placement })
      },
    })
  }

  const hostDisconnected = () => {
    cleanup?.()
    cleanup = undefined
  }

  host.addController({ hostUpdated, hostDisconnected })
}
