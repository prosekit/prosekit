import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    slowTestThreshold: 2000,
    reporters: ['tree'],
    coverage: {
      enabled: false,
      reporter: ['text-summary', 'text', 'html', 'json', 'json-summary'],
      provider: 'v8',
      include: ['packages/**/src/**'],
    },
    fileParallelism: false,
    projects: ['./packages/*', './website'],
  },
})
