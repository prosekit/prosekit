export async function asyncFrom<T>(asyncIterator: AsyncIterable<T>): Promise<T[]> {
  const values = []
  for await (const value of asyncIterator) {
    values.push(value)
  }
  return values
}
