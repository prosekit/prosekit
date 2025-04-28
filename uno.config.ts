import { preset } from '@prosekit/config-unocss'
import {
  defineConfig,
  type UserConfig,
} from 'unocss'

const config: UserConfig = defineConfig({
  presets: [preset()],
})

export default config
