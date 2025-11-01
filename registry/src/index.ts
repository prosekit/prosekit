import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { scanRegistry } from './meta/scan'
import { updateRegistryItems } from './meta/update-registry-item-json'
import { updateRegistry } from './meta/update-registry-json'

export async function genRegistry(outputPath: string) {
  if (skipGen()) return

  const items = await scanRegistry()
  await updateRegistry(items, outputPath)
  await vfs.commit()
}

export async function genRegistryItems(outputDir: string, updateText: (text: string) => string) {
  if (skipGen()) return

  const items = await scanRegistry()
  await updateRegistryItems(items, outputDir, updateText)
  await vfs.commit()
}
