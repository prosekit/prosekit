import { defineConfig, type UserConfig } from 'unocss'

import presetProseKit from '@prosekit/unocss-preset'

const config: UserConfig = defineConfig({
  presets: [presetProseKit()],
})

export default config
