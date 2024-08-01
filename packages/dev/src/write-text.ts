import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function writeText(
  filePath: string,
  text: string,
): Promise<boolean> {
  if (!path.isAbsolute(filePath)) {
    throw new Error('filePath must be an absolute path')
  }

  let original = ''
  try {
    original = await readFile(filePath, { encoding: 'utf-8' })
  } catch   {
    // ignore
  }

  if (text === original) {
    return false
  }

  if (!original) {
    const dirPath = path.dirname(filePath)
    await mkdir(dirPath, { recursive: true })
  }

  await writeFile(filePath, text)
  return true
}
