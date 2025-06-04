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

  let result: [number, number]

  switch (position) {
    case 'bottom-right':
      result = calcBottomRightResize(w, h, dx, dy, aspectRatio)
      break
    case 'bottom-left':
      result = calcBottomLeftResize(w, h, dx, dy, aspectRatio)
      break
    case 'top-right':
      result = calcTopRightResize(w, h, dx, dy, aspectRatio)
      break
    case 'top-left':
      result = calcTopLeftResize(w, h, dx, dy, aspectRatio)
      break
    case 'top':
      result = calcTopResize(w, h, dx, dy, aspectRatio)
      break
    case 'right':
      result = calcRightResize(w, h, dx, dy, aspectRatio)
      break
    case 'bottom':
      result = calcBottomResize(w, h, dx, dy, aspectRatio)
      break
    case 'left':
      result = calcLeftResize(w, h, dx, dy, aspectRatio)
      break
    default:
      throw new RangeError(`Invalid position: ${position}`)
  }

  const [nw, nh] = result
  return [Math.max(nw, 1), Math.max(nh, 1)]
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
