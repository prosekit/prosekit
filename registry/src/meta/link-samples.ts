import fs from 'node:fs/promises'
import path from 'node:path'

import { ROOT_DIR } from './root-dir'
import type { ItemAccumulator } from './types'

/**
 * Hard-link sample files with the same basename across different framework directories.
 * This ensures files like `query-users.ts` in react/sample, vue/sample, etc. are the same file on disk.
 */
export async function linkSamples(items: ItemAccumulator[]) {
  const allFiles = collectSampleFiles(items)
  const filesByBasename = Map.groupBy(allFiles, (file) => path.basename(file))

  await Promise.all(
    Array.from(filesByBasename.values()).map((files) => linkFileGroup(files)),
  )
}

function collectSampleFiles(items: ItemAccumulator[]): string[] {
  return Array.from(
    new Set(
      items
        .filter((item) => item.category === 'sample')
        .flatMap((item) => [...item.files])
        .map(filePath => path.join(ROOT_DIR, filePath)),
    ),
  )
}

async function areHardLinked(file1: string, file2: string): Promise<boolean> {
  try {
    const stat1 = await fs.lstat(file1)
    const stat2 = await fs.lstat(file2)
    return (
      stat1.ino === stat2.ino
      && stat1.dev === stat2.dev
      && stat1.nlink > 1
    )
  } catch {
    return false
  }
}

async function hardLinkFiles(sourceFile: string, targetFile: string) {
  await fs.unlink(targetFile)
  await fs.link(sourceFile, targetFile)
}

async function linkFileGroup(files: string[]) {
  if (files.length < 2) {
    console.warn(`[link-samples.ts] Warning: Not enough files to link: ${files.join(', ')}`)
    return
  }

  // Use the most recently modified file as the source
  const stats = await Promise.all(
    files.map(async (file) => ({ file, mtimeMs: (await fs.lstat(file)).mtimeMs })),
  )
  stats.sort((a, b) => b.mtimeMs - a.mtimeMs)

  const [sourceFile, ...targetFiles] = stats.map((s) => s.file)

  for (const targetFile of targetFiles) {
    if (await areHardLinked(sourceFile, targetFile)) continue
    await hardLinkFiles(sourceFile, targetFile)
  }
}
