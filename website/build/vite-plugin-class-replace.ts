import path from 'node:path'

import type { ViteUserConfig } from 'astro'
import MagicString from 'magic-string'

import {
  getClasses,
  refreshClasses,
} from './load-classes'

type Plugin = Required<ViteUserConfig>['plugins'][number]

const PLUGIN_NAME = '@prosekit/vite-plugin-class-replace'
const CLASS_TS_PATH = path.join(import.meta.dirname, 'classes.ts')

export function classReplace(): Plugin {
  const moduleIds = new Set<string>()

  return {
    name: PLUGIN_NAME,

    enforce: 'pre',

    configureServer(server) {
      server.watcher.add(CLASS_TS_PATH)
      server.watcher.on('all', async (_event, file) => {
        if (!CLASS_TS_PATH.includes(file)) {
          return
        }

        await refreshClasses()

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
