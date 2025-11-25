import { users } from './user-data'

export interface User {
  id: number
  name: string
}

let mockDelay = 300
let mockNetworkConnected = true
const networkConnectedHandlers: VoidFunction[] = []

/**
 * A utility function to simulate a network connection. Useful for testing.
 */
export function updateMockNetworkConnected(connected: boolean) {
  mockNetworkConnected = connected
  if (connected) {
    networkConnectedHandlers.forEach((handler) => handler())
    networkConnectedHandlers.length = 0
  }
}

/**
 * A utility function to simulate different query delays. Useful for testing.
 */
export function updateMockDelay(delay: number) {
  mockDelay = delay
}

/**
 * Simulate a user searching with some delay.
 */
export async function queryUsers(query: string): Promise<User[]> {
  if (!mockNetworkConnected) {
    await new Promise<void>((resolve) => {
      networkConnectedHandlers.push(resolve)
    })
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, mockDelay)
  })

  const normalizedQuery = query.toLowerCase().trim()
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(normalizedQuery))
    .slice(0, 10)
  return filteredUsers
}
