import type {
  FloatingElement,
  Middleware,
  ReferenceElement,
} from '@floating-ui/dom'
import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
} from '@floating-ui/dom'
import { getWindow } from '@zag-js/dom-query'
import { runIfFn } from '@zag-js/utils'

import type { PositioningOptions } from './options'

function dpr(win: Window, value: number) {
  const dpr = win.devicePixelRatio || 1
  return Math.round(value * dpr) / dpr
}

function _boundary(opts: PositioningOptions) {
  return runIfFn(opts.boundary)
}

function _offset(opts: PositioningOptions) {
  if (opts.offset == null) return
  return offset(opts.offset)
}

function _flip(opts: PositioningOptions) {
  if (!opts.flip) return
  return flip({
    boundary: _boundary(opts),
    padding: opts.overflowPadding,
    altBoundary: true,

    fallbackPlacements: opts.flip === true ? undefined : opts.flip,
  })
}

function _shift(opts: PositioningOptions) {
  if (!opts.shift) return
  return shift({
    boundary: _boundary(opts),
    padding: opts.overflowPadding,
    altBoundary: true,

    mainAxis: opts.shift,
    crossAxis: opts.overlap,
  })
}

function _size(opts: PositioningOptions) {
  return size({
    boundary: _boundary(opts),
    padding: opts.overflowPadding,
    altBoundary: true,

    apply({ elements, rects, availableHeight, availableWidth }) {
      const floating = elements.floating

      const referenceWidth = Math.round(rects.reference.width)
      availableWidth = Math.floor(availableWidth)
      availableHeight = Math.floor(availableHeight)

      floating.style.setProperty('--reference-width', `${referenceWidth}px`)
      floating.style.setProperty('--available-width', `${availableWidth}px`)
      floating.style.setProperty('--available-height', `${availableHeight}px`)
    },
  })
}

function _inline(opts: PositioningOptions) {
  if (!opts.inline) return
  return inline()
}

function _hide(opts: PositioningOptions) {
  if (!opts.hide) return
  return hide({
    padding: opts.overflowPadding,
    elementContext: 'reference',
  })
}

export function getPlacement(
  reference: ReferenceElement | null,
  floating: FloatingElement | null,
  options: PositioningOptions,
) {
  if (!floating || !reference) return

  /* -----------------------------------------------------------------------------
   * The middleware stack
   * -----------------------------------------------------------------------------*/

  const middleware: (Middleware | undefined)[] = [
    _offset(options),
    _flip(options),
    _shift(options),
    _size(options),
    _inline(options),
    _hide(options),
  ]

  /* -----------------------------------------------------------------------------
   * The actual positioning function
   * -----------------------------------------------------------------------------*/

  const { placement, strategy } = options

  const update = async () => {
    if (!reference || !floating) return

    const pos = await computePosition(reference, floating, {
      placement,
      middleware,
      strategy,
    })

    const hidden =
      pos.middlewareData.hide?.escaped ||
      pos.middlewareData.hide?.referenceHidden

    options.onComplete?.(pos)

    const win = getWindow(floating)
    const x = dpr(win, pos.x)
    const y = dpr(win, pos.y)

    floating.style.setProperty('--x', `${x}px`)
    floating.style.setProperty('--y', `${y}px`)

    // TODO: better way to do this?
    floating.style.setProperty('opacity', hidden ? '0' : '1')

    const contentEl = floating.firstElementChild

    if (contentEl) {
      const zIndex = win.getComputedStyle(contentEl).zIndex
      floating.style.setProperty('--z-index', zIndex)
    }
  }

  const autoUpdateOptions =
    typeof options.autoUpdate === 'boolean' ? undefined : options.autoUpdate
  const cancelAutoUpdate = options.autoUpdate
    ? autoUpdate(reference, floating, update, autoUpdateOptions)
    : undefined

  void update()

  return () => {
    cancelAutoUpdate?.()
    options.onCleanup?.()
  }
}
