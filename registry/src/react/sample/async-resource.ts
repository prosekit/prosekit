const EMOJIS = ['🌤️', '🌊', '🌿', '🔥', '🌙', '⚡', '🪐', '🌈']

const cache = new Map<string, Promise<string> | string>()

function hashSeed(seed: string): number {
  let value = 0
  for (let index = 0; index < seed.length; index++) {
    value = (value * 31 + seed.charCodeAt(index)) % EMOJIS.length
  }
  return value
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function nextAsyncSeed(seed: string): string {
  const match = /^seed-(\d+)$/.exec(seed)
  const index = match ? Number(match[1]) : 0
  return `seed-${(index + 1) % 8}`
}

export function readAsyncEmoji(seed: string): string {
  const cached = cache.get(seed)

  if (typeof cached === 'string') {
    return cached
  }

  if (cached instanceof Promise) {
    throw cached
  }

  const promise = sleep(800).then(() => {
    const value = EMOJIS[hashSeed(seed)]
    cache.set(seed, value)
    return value
  })

  cache.set(seed, promise)
  throw promise
}
