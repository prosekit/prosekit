import type { Schema } from '@prosekit/pm/model'
import type { EditorStateConfig } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import { uniqPush } from '../utils/uniq-array'

import { Facet } from './facet'

export type StatePayload = (ctx: { schema: Schema }) => EditorStateConfig

export const stateFacet = Facet.defineRootFacet<StatePayload>({
  convert: (callbacks: StatePayload[]): StatePayload => {
    return (ctx) => {
      const configs = callbacks.map((cb) => cb(ctx))
      const config: EditorStateConfig = {
        schema: ctx.schema,
        storedMarks: [],
        plugins: [],
      }

      for (const c of configs) {
        config.schema = config.schema ?? c.schema
        config.doc = config.doc ?? c.doc
        config.selection = config.selection ?? c.selection
        config.storedMarks = [...config.storedMarks!, ...(c.storedMarks ?? [])]
        config.plugins = uniqPush(config.plugins ?? [], c.plugins ?? [])
      }

      if (!config.doc && !config.schema) {
        throw new ProseKitError(
          "Can't create state without a schema nor a document",
        )
      }

      if (config.doc) {
        config.schema = undefined
      }

      return config
    }
  },
})
