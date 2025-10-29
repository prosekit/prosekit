const cleanupFunctions: Array<() => void | Promise<void>> = []

export function registerCleanupFunction(cleanupFunction: () => void | Promise<void>) {
  cleanupFunctions.push(cleanupFunction)
}

export async function runCleanupFunctions() {
  for (const cleanupFunction of cleanupFunctions) {
    await cleanupFunction()
  }
}
