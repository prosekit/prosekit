
import { defineConfig } from 'vitest/config'
import type { TestSpecification } from 'vitest/node'
import { BaseSequencer } from 'vitest/node'


const SLOW_TEST_FILE_NAMES = ['table.test.ts', 'slash-menu.test.ts']

function isSlowTest(testFilePath: string): boolean {
  return SLOW_TEST_FILE_NAMES.some(name => testFilePath.endsWith(name))
}

class TestSequencer extends BaseSequencer {
  override shard(files: TestSpecification[]): Promise<TestSpecification[]> {
    const { index, count } = this.ctx.config.shard!
    const chunks: TestSpecification[][] = []
    for (let i = 0; i < count; i++) {
      chunks.push([])
    }

    const sorted = [...files].sort(
      (a, b) => {
        return a.moduleId.localeCompare(b.moduleId)
      }
    ).sort((a, b) => {
      const aSlow = isSlowTest(a.moduleId) ? 1 : -1
      const bSlow = isSlowTest(b.moduleId) ? 1 : -1
      return aSlow - bSlow 
    })


    let pos = 0 
    for (const file of sorted) {
      chunks[pos].push(file)
      pos = (pos + 1) % count
    }

    return Promise.resolve(chunks[index - 1])
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
