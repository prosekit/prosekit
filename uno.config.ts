import { preset } from '@prosekit/unocss-preset'
import { defineConfig, type UserConfig } from 'unocss'

const config: UserConfig = defineConfig({
  presets: [preset()],
})

export default config
