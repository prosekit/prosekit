import { defineConfig } from 'vitest/config'
import type { TestSpecification } from 'vitest/node';
import { BaseSequencer } from 'vitest/node'

class TestSequencer extends BaseSequencer {
  override shard(files: TestSpecification[]): TestSpecification[] {
    const { index, count } = this.ctx.config.shard!

    // Sort files deterministically by moduleId (absolute file path)
    const sorted = [...files].sort((a, b) =>
      a.moduleId.localeCompare(b.moduleId),
    )

    // Snake distribution: distribute files across shards in a zigzag pattern
    // so that adjacent files (which may have similar weights) go to different
    // shards.
    //
    // Round 0 (L→R): shard 1, 2, 3, ..., N
    // Round 1 (R→L): shard N, N-1, ..., 1
    // Round 2 (L→R): shard 1, 2, 3, ..., N
    // ...
    const shards: TestSpecification[][] = Array.from(
      { length: count },
      () => [],
    )

    for (const [i, file] of sorted.entries()) {
      const round = Math.floor(i / count)
      const pos = i % count
      const shardIndex = round % 2 === 0 ? pos : count - 1 - pos
      shards[shardIndex].push(file)
    }

    return shards[index - 1]
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
