import { isJsonEqual } from './is-json-equal.js'
import { readJson } from './read-json.js'
import { writeText } from './write-text.js'

export async function writeJson(filePath: string, content: any) {
  let original: any = null
  try {
    original = await readJson(filePath)
  } catch (error) {
    // ignore
  }

  if (!isJsonEqual(original, content)) {
    await writeText(filePath, JSON.stringify(content, null, 2) + '\n')
  }
}
