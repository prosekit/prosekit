import fs from 'node:fs'
import path from 'node:path'

import { loadClasses } from '@prosekit/config-unocss/files'
import type { ViteUserConfig } from 'astro'
import MagicString from 'magic-string'
import { exec } from 'tinyexec'

type Plugin = Required<ViteUserConfig>['plugins'][number]

const PLUGIN_NAME = '@prosekit/vite-plugin-class-replace'
const CLASS_TS_PATH = path.join(import.meta.dirname, 'classes.ts')
const CLASS_JSON_PATH = path.join(import.meta.dirname, 'classes.gen.json')

class ClassLoader {
  private cachedClasses: Record<string, string> | undefined

  get(): Record<string, string> {
    if (!this.cachedClasses) {
      this.cachedClasses = loadClasses()
    }
    return this.cachedClasses
  }

  private load() {
    const json = fs.readFileSync(CLASS_JSON_PATH, 'utf-8')
    return JSON.parse(json) as Record<string, string>
  }

  async refresh() {
    this.cachedClasses = undefined
    await exec('pnpm', ['run', '-w', 'build:css'], {
      timeout: 10_000,
      throwOnError: true,
    })
    this.cachedClasses = undefined
  }
}

export function classReplace(): Plugin {
  const moduleIds = new Set<string>()
  const classLoader = new ClassLoader()

  return {
    name: PLUGIN_NAME,

    enforce: 'pre',

    configureServer(server) {
      server.watcher.add(CLASS_TS_PATH)
      server.watcher.on('all', async (event, file) => {
        if (!CLASS_TS_PATH.includes(file)) {
          return
        }

        await exec('pnpm', ['run', '-w', 'build:css'], {
          timeout: 10_000,
          throwOnError: true,
        })

        await classLoader.refresh()

        const modulesToInvalidate = Array.from(moduleIds)
          .map(moduleId => server.moduleGraph.getModuleById(moduleId))
          .filter(module => module != null)

        for (const module of modulesToInvalidate) {
          server.moduleGraph.invalidateModule(module)
        }

        const timestamp = Date.now()
        server.ws.send({
          type: 'update',
          updates: modulesToInvalidate.map((module) => ({
            acceptedPath: module.url,
            path: module.url,
            timestamp,
            type: 'js-update',
          })),
        })
      })
    },

    transform(code, id) {
      if (id.includes('node_modules')) {
        return
      }
      if (!code.includes('CSS_')) {
        return
      }

      moduleIds.add(id)
      const classes = classLoader.get()

      const ms = new MagicString(code)

      ms.replaceAll(
        /CSS_(\w+)/g,
        (input) => {
          const output = classes[input]
          if (output == null) {
            const message = `[${PLUGIN_NAME}] Unable to replace the class name "${input}" in ${id}`
            if (process.env.NODE_ENV === 'development') {
              console.warn(message)
              return input
            } else {
              throw new Error(message)
            }
          }
          return output
        },
      )
      return {
        code: ms.toString(),
        map: ms.generateMap(),
      }
    },
  }
}
