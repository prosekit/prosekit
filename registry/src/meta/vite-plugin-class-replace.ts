import fs from 'node:fs'
import path from 'node:path'
import { styleText } from 'node:util'

import MagicString from 'magic-string'
import type { Plugin as VitePlugin } from 'vite'

import { refreshClasses } from './load-classes'
import {
  CLASS_NAME_REGEXP,
  classNameReplacer,
} from './replace-classes'

const PLUGIN_NAME = '@prosekit/vite-plugin-class-replace'
const CLASS_TS_PATH = path.join(import.meta.dirname, '..', 'classes.ts')

export function classReplace(): VitePlugin {
  const moduleIds = new Set<string>()

  return {
    name: PLUGIN_NAME,

    enforce: 'pre',

    configureServer(server) {
      // Ensure the file exists
      if (!fs.existsSync(CLASS_TS_PATH)) {
        throw new Error(`Class file does not exist: ${CLASS_TS_PATH}`)
      }

      server.watcher.add(CLASS_TS_PATH)
      server.watcher.on('all', async (_event, file) => {
        if (!CLASS_TS_PATH.includes(file)) {
          return
        }

        server.config.logger.info('Refreshing classes from ' + styleText('blue', CLASS_TS_PATH))
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

      const ms = new MagicString(code)

      ms.replaceAll(
        CLASS_NAME_REGEXP,
        (input) => {
          return classNameReplacer(input, id)
        },
      )
      return {
        code: ms.toString(),
        map: ms.generateMap(),
      }
    },
  }
}
