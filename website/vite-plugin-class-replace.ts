import {
  getWatchFilePaths,
  loadClasses,
} from '@prosekit/config-unocss/files'
import type { ViteUserConfig } from 'astro'
import MagicString from 'magic-string'
import { exec } from 'tinyexec'

type Plugin = Required<ViteUserConfig>['plugins'][number]

const pluginName = '@prosekit/vite-plugin-class-replace'

export function classReplace(): Plugin {
  const watchFilePaths = getWatchFilePaths()

  let cachedClasses: Record<string, string> | undefined

  const getClasses = (): Record<string, string> => {
    if (!cachedClasses) {
      cachedClasses = loadClasses()
    }
    return cachedClasses
  }

  const moduleIds = new Set<string>()

  return {
    name: pluginName,

    enforce: 'pre',

    configureServer(server) {
      server.watcher.add(watchFilePaths)
      server.watcher.on('all', async (event, file) => {
        if (!watchFilePaths.includes(file)) {
          return
        }

        await exec('pnpm', ['run', '-w', 'build:css'], {
          timeout: 10_000,
          throwOnError: true,
        })

        cachedClasses = undefined

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
      const classes = getClasses()

      const ms = new MagicString(code)

      ms.replaceAll(
        /CSS_(\w+)/g,
        (input) => {
          const output = classes[input]
          if (output == null) {
            const message = `[${pluginName}] Unable to replace the class name "${input}" in ${id}`
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
