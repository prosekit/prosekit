import { defineConfig } from 'vitest/config'
import type { TestSpecification } from 'vitest/node'
import { BaseSequencer } from 'vitest/node'

const SLOW_TEST_FILE_NAMES = ['table.test.ts', 'slash-menu.test.ts']

function isSlowTest(testFilePath: string): boolean {
  return SLOW_TEST_FILE_NAMES.some((name) => testFilePath.endsWith('/' + name))
}

class TestSequencer extends BaseSequencer {
  // eslint-disable-next-line @typescript-eslint/require-await
  override async shard(files: TestSpecification[]): Promise<TestSpecification[]> {
    const { index, count } = this.ctx.config.shard!

    const sorted = [...files].sort((a, b) => {
      const slowDiff =
        Number(isSlowTest(a.moduleId)) - Number(isSlowTest(b.moduleId))
      if (slowDiff !== 0) return slowDiff
      return a.moduleId.localeCompare(b.moduleId)
    })

    const chunks: TestSpecification[][] = Array.from(
      { length: count },
      (): TestSpecification[] => [],
    )

    let pos = 0
    for (const file of sorted) {
      chunks[pos].push(file)
      pos = (pos + 1) % count
    }

    return chunks[index - 1]
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
