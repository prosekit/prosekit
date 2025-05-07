import path from 'node:path'
import process from 'node:process'

import { findRootSync } from '@manypkg/find-root'
import {
  definePreset,
  presetIcons,
  presetWind3,
  type PresetFactory,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

import * as Classes from './classes'
import { Colors } from './colors'

export const preset: PresetFactory = definePreset(() => ({
  name: 'prosekit',
  presets: [presetWind3(), presetIcons(), presetAnimations()],
  shortcuts: { ...Colors, ...Classes },
}))

export function configDeps(): string[] {
  try {
    const root = findRootSync(process.cwd()).rootDir
    return [
      'index.ts',
      'colors.ts',
      'classes.ts',
    ].map(
      file => path.join(root, 'packages/config-unocss/src', file),
    )
  } catch (error) {
    console.warn('[@prosekit/config-unocss] Unable to get configDeps:', error)
    return []
  }
}
