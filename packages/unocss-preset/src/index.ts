import path from 'node:path'
import process from 'node:process'

import { findRootSync } from '@manypkg/find-root'
import { Colors, Themes } from '@prosekit/themes'
import type { PresetFactory } from 'unocss'
import { definePreset, presetIcons, presetWind } from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

const safeset = new Set(
  Object.entries(Themes)
    .flat()
    .flatMap((value) => value.split(' ')),
)
const safelist = Array.from(safeset).sort()

export const preset: PresetFactory = definePreset(() => ({
  name: 'prosekit',
  presets: [presetWind(), presetIcons(), presetAnimations()],
  safelist,
  // Add colors as shortcuts so that the vscode extension can highlight them.
  shortcuts: Colors,
}))

export function configDeps(): string[] {
  try {
    const root = findRootSync(process.cwd()).rootDir
    // Colors are calculated on the fly, so we need to reload UnoCSS when the
    // color source file changes.
    return [path.join(root, 'packages/themes/src/colors.ts')]
  } catch (error) {
    console.warn('[@prosekit/unocss-preset] Unable to get configDeps', error)
    return []
  }
}
