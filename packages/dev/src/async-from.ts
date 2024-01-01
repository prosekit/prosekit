export async function asyncFrom<T>(asyncIterator: AsyncIterable<T>) {
  const values = []
  for await (const value of asyncIterator) {
    values.push(value)
  }
  return values
}
