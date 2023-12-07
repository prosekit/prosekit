import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: false,
      all: false,
      provider: 'istanbul',
    },
  },
})
