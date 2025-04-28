import {
  defineConfig,
  type UserConfig,
} from 'unocss'

import { preset } from '@prosekit/config-unocss'

const config: UserConfig = defineConfig({
  presets: [preset()],
})

export default config
