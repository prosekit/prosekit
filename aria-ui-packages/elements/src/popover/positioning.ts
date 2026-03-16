import { FeatureDetection } from '@aria-ui-v2/utils'
import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
  type Alignment,
  type DetectOverflowOptions,
  type FloatingElement,
  type Middleware,
  type Placement,
  type ReferenceElement,
  type Side,
  type VirtualElement,
} from '@floating-ui/dom'
import type { AutoUpdateOptions, Boundary, ElementContext, OffsetOptions, RootBoundary } from '@floating-ui/dom'
import { getWindow, isElementLike } from '@ocavue/utils'

/**
 * @internal
 */
interface UpdatePlacementOpinions {
  strategy: 'absolute' | 'fixed'
  placement: Placement
  autoUpdate: boolean | AutoUpdateOptions
  hoist: boolean
  offset: OffsetOptions
  flip: boolean | Placement[]
  shift: boolean
  overlap: boolean
  fitViewport: boolean
  sameWidth: boolean
  sameHeight: boolean
  inline: boolean
  hide: boolean
  boundary: Boundary
  rootBoundary: RootBoundary
  overflowPadding: number
  elementContext: ElementContext
  altBoundary: boolean
}

/**
 * @internal
 */
export function updatePlacement(
  floating: FloatingElement,
  reference: ReferenceElement,
  options: UpdatePlacementOpinions,
): VoidFunction | undefined {
  /* -----------------------------------------------------------------------------
   * The middleware stack
   * -----------------------------------------------------------------------------*/

  const middleware: (Middleware | undefined)[] = [
    setupOffset(options),
    setupFlip(options),
    setupShift(options),
    setupSize(options),
    setupInline(options),
    setupHide(options),
  ]

  /* -----------------------------------------------------------------------------
   * The actual positioning function
   * -----------------------------------------------------------------------------*/

  const { placement, strategy } = options

  let canceled = false

  const update = async () => {
    if (canceled) {
      return
    }

    const referenceElement = unwrapElement(reference)
    if (referenceElement && !referenceElement.isConnected) {
      return
    }

    if (options.hoist && FeatureDetection.supportsPopover()) {
      // Override the `margin: auto` style, which breaks the positioning.
      floating.style.margin = 'unset'
      floating.setAttribute('popover', 'manual')
      floating.showPopover?.()
    }

    const pos = await computePosition(reference, floating, {
      placement,
      middleware,
      strategy,
    })

    if (canceled) {
      return
    }

    if (options.hide) {
      const hidden =
        // Whether the floating element is fully clipped
        pos.middlewareData.hide?.escaped
        // Whether the reference element is fully clipped
        || pos.middlewareData.hide?.referenceHidden

      floating.style.visibility = hidden ? 'hidden' : 'visible'
    }

    const dpr = getDPR(floating)

    // https://floating-ui.com/docs/misc#subpixel-and-accelerated-positioning
    const x = Math.round(pos.x * dpr) / dpr
    const y = Math.round(pos.y * dpr) / dpr

    floating.style.position = pos.strategy
    floating.style.top = '0px'
    floating.style.left = '0px'
    floating.style.transform = `translate(${x}px,${y}px)`

    // Learned from https://github.com/floating-ui/floating-ui/blob/8f155121/packages/vue/src/useFloating.ts#L72
    if (dpr >= 1.5) {
      floating.style.willChange = 'transform'
    }

    const [side, align] = getSideAndAlignFromPlacement(pos.placement)

    floating.setAttribute('data-side', side)
    floating.setAttribute('data-align', align)
  }

  /* -----------------------------------------------------------------------------
   * Auto update
   * -----------------------------------------------------------------------------*/

  const autoUpdateOptions = typeof options.autoUpdate === 'boolean' ? undefined : options.autoUpdate

  const cancelAutoUpdate = options.autoUpdate
    ? autoUpdate(reference, floating, update, autoUpdateOptions)
    : undefined

  if (!options.autoUpdate) {
    void update()
  }

  return () => {
    canceled = true
    cancelAutoUpdate?.()
  }
}

function getOverflowOptions(
  props: UpdatePlacementOpinions,
): DetectOverflowOptions {
  return {
    boundary: props.boundary,
    rootBoundary: props.rootBoundary,
    elementContext: props.elementContext,
    altBoundary: props.altBoundary,
    padding: props.overflowPadding,
  }
}

function setupOffset(props: UpdatePlacementOpinions) {
  if (props.offset == null) return
  return offset(props.offset)
}

function setupFlip(props: UpdatePlacementOpinions) {
  if (!props.flip) return
  return flip({
    ...getOverflowOptions(props),

    fallbackPlacements: props.flip === true ? undefined : props.flip,

    // Disable the cross axis check so that `flip()` can work with `shift()`.
    // See also https://floating-ui.com/docs/flip#combining-with-shift
    crossAxis: false,
  })
}

function setupShift(props: UpdatePlacementOpinions) {
  if (!props.shift) return
  return shift({
    ...getOverflowOptions(props),

    mainAxis: props.shift,
    crossAxis: props.overlap,
  })
}

function setupSize(props: UpdatePlacementOpinions) {
  if (!props.fitViewport && !props.sameWidth && !props.sameHeight) return

  return size({
    ...getOverflowOptions(props),

    apply({ elements, rects, availableHeight, availableWidth }) {
      const floating = elements.floating

      if (props.sameWidth) {
        floating.style.width = `${Math.round(rects.reference.width)}px`
      }
      if (props.sameHeight) {
        floating.style.height = `${Math.round(rects.reference.height)}px`
      }
      if (props.fitViewport) {
        floating.style.maxWidth = `${Math.floor(availableWidth)}px`
        floating.style.maxHeight = `${Math.floor(availableHeight)}px`
      }
    },
  })
}

function setupInline(props: UpdatePlacementOpinions) {
  if (!props.inline) return
  return inline()
}

function setupHide(props: UpdatePlacementOpinions) {
  if (!props.hide) return
  return hide({
    padding: props.overflowPadding,
    elementContext: 'reference',
  })
}

function getDPR(element: Element): number {
  const win = getWindow(element)
  return win.devicePixelRatio || 1
}

function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = 'center'] = placement.split('-')
  return [side as Side, align as Alignment | 'center'] as const
}

/**
 * Unwraps a virtual element to its underlying DOM element.
 *
 * Copied from https://github.com/floating-ui/floating-ui/blob/b80ccaf9cfd7f80f28546906c60284c8385940f0/packages/dom/src/utils/unwrapElement.ts
 *
 * @internal
 */
export function unwrapElement(
  element: Element | VirtualElement,
): Element | undefined {
  return !isElementLike(element) ? element.contextElement : element
}
