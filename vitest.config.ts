import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    slowTestThreshold: 2000,
    reporters: ['verbose'],
    retry: process.env.CI ? 2 : 0,
    coverage: {
      enabled: false,
      reporter: ['text-summary', 'text', 'html', 'json', 'json-summary'],
      provider: 'v8',
      include: ['packages/**/src/**'],
      exclude: ['packages/dev/**/*', 'packages/config-*/**/*'],
    },
    fileParallelism: false,
    projects: ['./packages/*', './website'],
  },
})
