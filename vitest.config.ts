import { defineConfig } from 'vitest/config'
import type { TestSpecification } from 'vitest/node'
import { BaseSequencer } from 'vitest/node'

const SLOW_TEST_FILE_NAMES = ['table.test.ts', 'slash-menu.test.ts', 'block-handle.test.ts']

function isSlowTest(testFilePath: string): boolean {
  const fileName = testFilePath.split('/').pop() || ''
  return SLOW_TEST_FILE_NAMES.includes(fileName)
}

class TestSequencer extends BaseSequencer {
  override sort(files: TestSpecification[]): Promise<TestSpecification[]> {
    const sorted = files.toSorted((a, b) => a.moduleId.localeCompare(b.moduleId))
    return Promise.resolve(sorted)
  }
  override shard(files: TestSpecification[]): Promise<TestSpecification[]> {
    const { index, count } = this.ctx.config.shard!

    console.debug(`[DEBUG] index: ${index}, count: ${count}, total files: ${files.length}`)

    const slowFiles: TestSpecification[] = []
    const fastFiles: TestSpecification[] = []

    const sorted = files.toSorted((a, b) => a.moduleId.localeCompare(b.moduleId))
    for (const file of sorted) {
      if (isSlowTest(file.moduleId)) {
        slowFiles.push(file)
      } else {
        fastFiles.push(file)
      }
    }

    const chunks: TestSpecification[][] = Array.from({ length: count }, (): TestSpecification[] => [])

    // Each slow test gets its own shard
    for (const [i, slowFile] of slowFiles.entries()) {
      chunks[i % chunks.length].push(slowFile)
    }

    // Distribute fast tests across remaining shards, or all shards if slow tests filled them all
    const emptyChunks = chunks.filter((chunk) => chunk.length === 0)
    const fastChunks = emptyChunks.length > 0 ? emptyChunks : chunks
    for (const [i, fastFile] of fastFiles.entries()) {
      fastChunks[i % fastChunks.length].push(fastFile)
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
