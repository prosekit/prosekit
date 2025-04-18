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
      return calcBottomRightResize(w, h, dx, dy, aspectRatio)
    case 'bottom-left':
      return calcBottomLeftResize(w, h, dx, dy, aspectRatio)
    case 'top-right':
      return calcTopRightResize(w, h, dx, dy, aspectRatio)
    case 'top-left':
      return calcTopLeftResize(w, h, dx, dy, aspectRatio)
    case 'top':
      return calcTopResize(w, h, dx, dy, aspectRatio)
    case 'right':
      return calcRightResize(w, h, dx, dy, aspectRatio)
    case 'bottom':
      return calcBottomResize(w, h, dx, dy, aspectRatio)
    case 'left':
      return calcLeftResize(w, h, dx, dy, aspectRatio)
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
