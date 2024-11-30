import {
  defineConfig,
  type UserConfig,
} from 'unocss'

import { preset } from '@prosekit/unocss-preset'

const config: UserConfig = defineConfig({
  presets: [preset()],
})

export default config
