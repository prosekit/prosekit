/**
 * @internal
 */
export function throttle<Args extends any[]>(
  callback: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let lastTime = 0

  return (...args: Args) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      callback(...args)
      lastTime = now
    }
  }
}
