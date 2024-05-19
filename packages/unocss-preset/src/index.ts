import { Themes } from '@prosekit/themes'
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
  // configDeps: [
  //   './packages/themes/src/colors.ts',
  //   './packages/themes/src/classes.ts',
  // ],
}))

export default preset
