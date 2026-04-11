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

    if (slowFiles.length < count) {
      // Each slow test gets its own shard, and the remaining shards are filled with fast tests
      const slowChunks = chunks.slice(0, slowFiles.length)
      const fastChunks = chunks.slice(slowFiles.length)
      for (const [i, slowFile] of slowFiles.entries()) {
        slowChunks[i].push(slowFile)
      }
      for (const [i, fastFile] of fastFiles.entries()) {
        fastChunks[i % fastChunks.length].push(fastFile)
      }
    } else {
      // Evenly distribute slow tests across all shards, and fill remaining space with fast tests
      for (const [i, file] of [...slowFiles, ...fastFiles].entries()) {
        chunks[i % chunks.length].push(file)
      }
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
