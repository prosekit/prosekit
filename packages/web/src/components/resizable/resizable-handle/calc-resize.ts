import { isFinitePositiveNumber } from '../../../utils/is-finite-positive-number'

export function calcResize(
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right',
  w: number,
  h: number,
  dx: number,
  dy: number,
  aspectRatio: number | null | undefined,
): [w: number, h: number] {
  aspectRatio = aspectRatio ? aspectRatio : w / h
  aspectRatio = isFinitePositiveNumber(aspectRatio) ? aspectRatio : 1

  switch (position) {
    case 'bottom-right':
      return clamp(calcBottomRightResize(w, h, dx, dy, aspectRatio))
    case 'bottom-left':
      return clamp(calcBottomLeftResize(w, h, dx, dy, aspectRatio))
    case 'top-right':
      return clamp(calcTopRightResize(w, h, dx, dy, aspectRatio))
    case 'top-left':
      return clamp(calcTopLeftResize(w, h, dx, dy, aspectRatio))
    case 'top':
      return clamp(calcTopResize(w, h, dx, dy, aspectRatio))
    case 'right':
      return clamp(calcRightResize(w, h, dx, dy, aspectRatio))
    case 'bottom':
      return clamp(calcBottomResize(w, h, dx, dy, aspectRatio))
    case 'left':
      return clamp(calcLeftResize(w, h, dx, dy, aspectRatio))
    default:
      throw new RangeError(`Invalid position: ${position}`)
  }
}

type CalcResize = (
  w: number,
  h: number,
  dx: number,
  dy: number,
  aspectRatio: number,
) => [w: number, h: number]

const calcBottomRightResize: CalcResize = (w, h, dx, dy, r) => {
  w += dx
  h += dy

  const sum = w + h
  h = sum / (r + 1)
  w = sum - h
  return [w, h]
}

const calcBottomLeftResize: CalcResize = (w, h, dx, dy, r) => {
  w -= dx
  h += dy

  const sum = w + h
  h = sum / (r + 1)
  w = sum - h
  return [w, h]
}

const calcTopRightResize: CalcResize = (w, h, dx, dy, r) => {
  w += dx
  h -= dy

  const sum = w + h
  h = sum / (r + 1)
  w = sum - h
  return [w, h]
}

const calcTopLeftResize: CalcResize = (w, h, dx, dy, r) => {
  w -= dx
  h -= dy

  const sum = w + h
  h = sum / (r + 1)
  w = sum - h
  return [w, h]
}

const calcTopResize: CalcResize = (w, h, dx, dy, r) => {
  h -= dy
  w = h * r
  return [w, h]
}

const calcRightResize: CalcResize = (w, h, dx, dy, r) => {
  w += dx
  h = w / r
  return [w, h]
}

const calcBottomResize: CalcResize = (w, h, dx, dy, r) => {
  h += dy
  w = h * r
  return [w, h]
}

const calcLeftResize: CalcResize = (w, h, dx, dy, r) => {
  w -= dx
  h = w / r
  return [w, h]
}

function clamp([w, h]: [number, number]): [number, number] {
  return [
    Math.max(w, 1),
    Math.max(h, 1),
  ]
}
