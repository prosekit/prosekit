import { defineConfig } from 'vitest/config'
import type { TestSpecification } from 'vitest/node';
import { BaseSequencer } from 'vitest/node'

class TestSequencer extends BaseSequencer {
  override async shard(files: TestSpecification[]): Promise<TestSpecification[]> {
    console.log("[DEBUG2] files:" ,files)
    const result = await super.shard(files)
    console.log("[DEBUG3] result:" ,result)
    return result
  }
}


export default defineConfig({
  test: {
    sequence: {
            sequencer: TestSequencer,
    },
    slowTestThreshold: 2000,
    reporters: ['verbose'],
    retry: process.env.CI ? 3 : 0,
    bail: process.env.CI ? 0 : 1,
    coverage: {
      enabled: false,
      reporter: ['text-summary', 'text', 'html', 'json', 'json-summary'],
      provider: 'v8',
      include: ['packages/**/src/**'],
      exclude: ['packages/dev/**/*', 'packages/config-*/**/*'],
    },
    fileParallelism: false,
    projects: ['./packages/*', './registry'],
  },
})
