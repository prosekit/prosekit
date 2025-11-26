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
    return stat1.ino === stat2.ino
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
    console.warn(`[registry] Not enough files to link: ${files.join(', ')}`)
    return
  }

  const [sourceFile, ...targetFiles] = files

  for (const targetFile of targetFiles) {
    if (await areHardLinked(sourceFile, targetFile)) continue
    await hardLinkFiles(sourceFile, targetFile)
  }
}
