import { isJsonEqual } from './is-json-equal.js'
import { readJson } from './read-json.js'
import { writeText } from './write-text.js'

export async function writeJson<T = any>(
  filePath: string,
  content: T,
): Promise<boolean> {
  let original: T | null = null
  try {
    original = await readJson(filePath) as T
  } catch {
    // ignore
  }

  if (isJsonEqual(original, content)) {
    return false
  }
  await writeText(filePath, JSON.stringify(content, null, 2) + '\n')
  return true
}
