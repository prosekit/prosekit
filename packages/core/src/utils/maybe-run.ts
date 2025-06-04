/**
 * @internal
 */
function maybeRun(value, ...args) {
  return typeof value === 'function' ? value(...args) : value
}

export { maybeRun }
