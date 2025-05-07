export function timer(fn: () => Promise<void>) {
  return async () => {
    const t1 = Date.now()
    await fn()
    const t2 = Date.now()
    // eslint-disable-next-line no-console
    console.log(`Time: ${t2 - t1}ms`)
  }
}
