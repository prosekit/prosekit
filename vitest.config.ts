import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: false,
      all: false,
      provider: 'v8',
    },
    fileParallelism: false,
    projects: ['packages/*'],
  },
})
