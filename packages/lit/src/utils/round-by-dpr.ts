/** Rounds a value to the nearest device pixel ratio. */
export function roundByDPR(value: number) {
  const dpr = window.devicePixelRatio || 1
  return Math.round(value * dpr) / dpr
}
