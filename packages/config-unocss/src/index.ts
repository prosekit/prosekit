import path from 'node:path'
import process from 'node:process'

import { findRootSync } from '@manypkg/find-root'
import {
  definePreset,
  isStaticShortcut,
  presetIcons,
  presetWind3,
  type CSSObject,
  type DynamicShortcut,
  type DynamicShortcutMatcher,
  type Preset,
  type PresetFactory,
  type UserShortcuts,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

import * as Classes from './classes'
import { Colors } from './colors'

// Remove some CSS variables that have value `initial`. See more:
// https://github.com/xsjcTony/unocss-preset-animations/pull/12
function patchedPresetAnimations() {
  function patchCSSObject(value: CSSObject): CSSObject {
    return Object.fromEntries(
      Object.entries(value).filter(([key, value]) => {
        if (key.startsWith('--') && value === 'initial') {
          return false
        }
        return true
      }),
    )
  }

  function patchDynamicShortcutMatcher<Theme extends object>(matcher: DynamicShortcutMatcher<Theme>): DynamicShortcutMatcher<Theme> {
    return (...args) => {
      const result = matcher(...args)
      if (result && Array.isArray(result) && result.length >= 2) {
        const [first, second, ...rest] = result
        if (second && typeof second === 'object' && !Array.isArray(second)) {
          return [first, patchCSSObject(second), ...rest]
        }
      }
      return result
    }
  }

  function patchDynamicShortcut<Theme extends object>(shortcut: DynamicShortcut<Theme>): DynamicShortcut<Theme> {
    const [selector, matcher, options] = shortcut
    return [selector, patchDynamicShortcutMatcher(matcher), options]
  }

  function patchShortcuts<Theme extends object>(shortcuts: UserShortcuts<Theme>): UserShortcuts<Theme> {
    if (Array.isArray(shortcuts)) {
      return shortcuts.map(shortcut => {
        if (shortcut && Array.isArray(shortcut) && !isStaticShortcut(shortcut)) {
          return patchDynamicShortcut(shortcut)
        }
        return shortcut
      })
    }
    return shortcuts
  }

  function patchPresetAnimations<Theme extends object>(preset: Preset<Theme>): Preset<Theme> {
    const { shortcuts } = preset
    return { ...preset, shortcuts: shortcuts && patchShortcuts(shortcuts) }
  }

  return patchPresetAnimations(presetAnimations())
}

export const preset: PresetFactory = definePreset(() => ({
  name: 'prosekit',
  presets: [presetWind3(), presetIcons(), patchedPresetAnimations()],
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
