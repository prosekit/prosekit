import { users } from './user-data'

export interface User {
  id: number
  name: string
}

export function queryUsers(query: string): Promise<User[]> {
  const lowerCaseQuery = query.toLowerCase()
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(lowerCaseQuery))
    .slice(0, 10)
  return Promise.resolve(filteredUsers)
}

/**
 * Simulate a user searching with some delay.
 */
export function queryUsersWithDelay(query: string, delayMilliseconds: number = 300): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(queryUsers(query))
    }, delayMilliseconds)
  })
}
