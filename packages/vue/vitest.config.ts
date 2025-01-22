import { config } from '@prosekit/config-vitest'
import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vitest/config'

export default mergeConfig(config, {
  plugins: [vue()],
})
