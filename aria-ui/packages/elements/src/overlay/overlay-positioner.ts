import type { Context, HostElement } from '@aria-ui-v2/core'
import { computed, defineProps, useEffect, type Store } from '@aria-ui-v2/core'
import { FeatureDetection, useElementId } from '@aria-ui-v2/utils'
import type { AutoUpdateOptions, Boundary, ElementContext, OffsetOptions, Placement, RootBoundary } from '@floating-ui/dom'
import {  isHTMLElement, isNodeLike } from '@ocavue/utils'

import type { OverlayStore } from './overlay-store.ts'
import { updatePlacement } from './positioning.ts'

/**
 * @public
 */
export interface OverlayPositionerProps {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy: 'absolute' | 'fixed'

  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement: Placement

  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate: boolean | AutoUpdateOptions

  /**
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
   *
   * @default true
   */
  hoist: boolean

  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset: OffsetOptions

  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip: boolean | Placement[]

  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift: boolean

  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap: boolean

  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport: boolean

  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth: boolean

  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight: boolean

  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline: boolean

  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide: boolean

  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary: Boundary

  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary: RootBoundary

  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding: number

  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext: ElementContext

  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary: boolean
}

/**
 * @internal
 */
export const OverlayPositionerPropsDeclaration = /* @__PURE__ */ defineProps<OverlayPositionerProps>({
  strategy: { default: 'absolute', attribute: 'strategy', type: 'string' },
  placement: { default: 'top', attribute: 'placement', type: 'string' },
  autoUpdate: { default: true, attribute: false, type: 'json' },
  hoist: { default: true, attribute: 'hoist', type: 'boolean' },
  offset: { default: 6, attribute: false, type: 'json' },
  flip: { default: true, attribute: false, type: 'json' },
  shift: { default: true, attribute: 'shift', type: 'boolean' },
  overlap: { default: false, attribute: 'overlap', type: 'boolean' },
  fitViewport: { default: false, attribute: 'fit-viewport', type: 'boolean' },
  sameWidth: { default: false, attribute: 'same-width', type: 'boolean' },
  sameHeight: { default: false, attribute: 'same-height', type: 'boolean' },
  inline: { default: false, attribute: 'inline', type: 'boolean' },
  hide: { default: false, attribute: 'hide', type: 'boolean' },
  boundary: { default: 'clippingAncestors', attribute: false, type: 'json' },
  rootBoundary: { default: 'viewport', attribute: 'root-boundary', type: 'string' },
  overflowPadding: { default: 4, attribute: 'overflow-padding', type: 'number' },
  elementContext: { default: 'floating', attribute: 'element-context', type: 'string' },
  altBoundary: { default: false, attribute: 'alt-boundary', type: 'boolean' },
})

/**
 * @internal
 */
export function setupOverlayPositioner(
  host: HostElement,
  props: Store<OverlayPositionerProps>,
  storeContext: Context<OverlayStore>,
): void {
  const getStore = storeContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen() ?? false)
  const getAnchorElement = computed(() => getStore()?.anchorElement.get())

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const id = useElementId(host)
    store.setPositionerId(id)
  })

  if (FeatureDetection.supportsPopover()) {
    useEffect(host, () => {
      host.popover = 'manual'
    })

    useEffect(host, () => {
      const store = getStore()
      if (!store) return

      const expectedOpen = getOpen()
      const currentOpen = host.matches(':popover-open')

      if (currentOpen === expectedOpen) return

      if (FeatureDetection.supportsTogglePopoverSource()) {
        const anchorElement = getAnchorElement()
        host.togglePopover(
          (isNodeLike(anchorElement)  && isHTMLElement(anchorElement))
            ? { force: expectedOpen, source: anchorElement }
            : { force: expectedOpen },
        )
      } else {
        if (expectedOpen) {
          host.showPopover()
        } else {
          host.hidePopover()
        }
      }
    })
  } else {
    useEffect(host, () => {
      const open = getOpen()
      if (open) {
        host.style.display = ''
      } else {
        host.style.display = 'none'
      }
    })
  }

  useEffect(host, () => {
    const open = getOpen()
    if (!open) return

    const anchorElement = getAnchorElement()
    if (!anchorElement) return

    return updatePlacement(host, anchorElement, {
      strategy: props.strategy.get(),
      placement: props.placement.get(),
      autoUpdate: props.autoUpdate.get(),
      hoist: props.hoist.get(),
      offset: props.offset.get(),
      flip: props.flip.get(),
      shift: props.shift.get(),
      overlap: props.overlap.get(),
      fitViewport: props.fitViewport.get(),
      sameWidth: props.sameWidth.get(),
      sameHeight: props.sameHeight.get(),
      inline: props.inline.get(),
      hide: props.hide.get(),
      boundary: props.boundary.get(),
      rootBoundary: props.rootBoundary.get(),
      overflowPadding: props.overflowPadding.get(),
      elementContext: props.elementContext.get(),
      altBoundary: props.altBoundary.get(),
    })
  })
}
