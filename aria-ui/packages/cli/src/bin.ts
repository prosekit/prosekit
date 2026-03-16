import { Command, Options } from '@effect/cli'
import { Path } from '@effect/platform'
import { NodeContext, NodeRuntime } from '@effect/platform-node'
import { Effect } from 'effect'

import { version } from '../package.json' with { type: 'json' }

import { generateFiles } from './generate'
import { parse } from './parse'

const tsconfigOption = Options.file('tsconfig', { exists: 'yes' })

const entryOption = Options.file('entry', { exists: 'yes' })

const outputOption = Options.directory('output')

const prefixOption = Options.text('prefix').pipe(Options.withDefault('aria-ui'))

const importSourceOption = Options.text('import-source')

const command = Command.make(
  'aria-ui',
  { tsconfig: tsconfigOption, entry: entryOption, output: outputOption, prefix: prefixOption, importSource: importSourceOption },
  (options) =>
    Effect.gen(function*() {
      const path = yield* Path.Path

      const tsconfigFilePath = path.resolve(options.tsconfig)
      const entryFilePath = path.resolve(options.entry)
      const outputDir = path.resolve(options.output)

      yield* Effect.log(`Loading ${tsconfigFilePath}`)
      yield* Effect.log(`Reading ${entryFilePath}`)

      const parsed = parse(tsconfigFilePath, entryFilePath)

      yield* Effect.log(`Done parsing`)
      yield* Effect.log(JSON.stringify(parsed, null, 2))

      yield* Effect.log(`Generating files to ${outputDir}`)
      yield* generateFiles(parsed, outputDir, {
        prefix: options.prefix,
        importSource: options.importSource,
      })
      yield* Effect.log(`Done generating`)
    }),
)

const cli = Command.run(command, {
  name: 'aria-ui',
  version: version,
})

cli(process.argv).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
