import { isJsonEqual } from './is-json-equal.js'
import { readJson } from './read-json.js'
import { writeText } from './write-text.js'

export async function writeJson(
  filePath: string,
  content: any,
): Promise<boolean> {
  let original: any = null
  try {
    original = await readJson(filePath)
  } catch {
    // ignore
  }

  if (isJsonEqual(original, content)) {
    return false
  }
  await writeText(filePath, JSON.stringify(content, null, 2) + '\n')
  return true
}
