import { buildApplication, buildCommand, run } from '@stricli/core'

import { version } from '../package.json' with { type: 'json' }

import { build, type BuildOptions } from './build'
import { FRAMEWORKS } from './generate'

type CliBuildOptions = Omit<BuildOptions, 'wrapperExtensions'>

const command = buildCommand({
  async func(flags: CliBuildOptions) {
    return await build(flags)
  },
  parameters: {
    flags: {
      tsconfig: {
        kind: 'parsed',
        parse: String,
        brief: 'Path to tsconfig.json. For example "./tsconfig.json".',
      },
      entry: {
        kind: 'parsed',
        parse: String,
        brief: 'Path to the exports entry file. For example "./src/foo/index.ts".',
      },
      output: {
        kind: 'parsed',
        parse: String,
        brief: 'Output directory for generated files. For example "./output/react/foo".',
      },
      prefix: {
        kind: 'parsed',
        parse: String,
        brief: 'Custom element tag prefix',
        default: 'aria-ui',
      },
      importSource: {
        kind: 'parsed',
        parse: String,
        brief: 'Module path for imports in generated code. For example "../../src/foo/index.ts".',
      },
      framework: {
        kind: 'enum',
        values: FRAMEWORKS,
        brief: 'Target framework to generate components for.',
      },
    },
  },
  docs: {
    brief: 'Generate framework-specific component wrappers from aria-ui components',
  },
})

const app = buildApplication(command, {
  name: 'aria-ui',
  versionInfo: {
    currentVersion: version,
  },
  scanner: {
    caseStyle: 'allow-kebab-for-camel',
  },
})

void run(app, process.argv.slice(2), { process })
