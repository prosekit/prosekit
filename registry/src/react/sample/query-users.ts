import { users } from './user-data'

export interface User {
  id: number
  name: string
}

const connectHandlers: VoidFunction[] = []
let mockNetworkStatus: 'fast' | 'slow' | 'offline' = 'slow'

/**
 * A utility function to simulate different network states. Useful for testing.
 */
export function updateMockNetworkStatus(status: 'fast' | 'slow' | 'offline') {
  mockNetworkStatus = status
  if (status !== 'offline') {
    connectHandlers.forEach((handler) => handler())
    connectHandlers.length = 0
  }
}

/**
 * Simulate a user searching with some delay.
 */
export async function queryUsers(query: string): Promise<User[]> {
  if (mockNetworkStatus === 'offline') {
    await new Promise<void>((resolve) => connectHandlers.push(resolve))
  }
  if (mockNetworkStatus === 'slow') {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 300))
  }

  const normalizedQuery = query.toLowerCase().trim()
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(normalizedQuery))
    .slice(0, 10)
  return filteredUsers
}
