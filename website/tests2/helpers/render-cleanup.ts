const cleanupFunctions = new Set<() => void | Promise<void>>()

export function registerCleanupFunction(cleanupFunction: () => void | Promise<void>) {
  cleanupFunctions.add(cleanupFunction)
}

export async function runCleanupFunctions() {
  for (const cleanupFunction of cleanupFunctions) {
    await cleanupFunction()
  }
}
