import { Colors, Themes } from '@prosekit/themes'
import {
  definePreset,
  presetIcons,
  presetWind,
  type PresetFactory,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

const safeset = new Set(
  Object.entries(Themes)
    .flat()
    .flatMap((value) => value.split(' ')),
)
const safelist = Array.from(safeset).sort()

const preset: PresetFactory = definePreset(() => ({
  name: 'prosekit',
  presets: [presetWind(), presetIcons(), presetAnimations()],
  safelist,
  // Add colors as shortcuts so that the vscode extension can highlight them.
  shortcuts: Colors,
}))

export default preset
