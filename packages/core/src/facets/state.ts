import type { Schema } from '@prosekit/pm/model'
import type { EditorStateConfig } from '@prosekit/pm/state'

import { uniqPush } from '../utils/array'
import { assert } from '../utils/assert'

import {
  defineFacet,
  type Facet,
} from './facet'
import {
  rootFacet,
  type RootPayload,
} from './root'

export type StatePayload = (ctx: { schema: Schema }) => EditorStateConfig

export const stateFacet: Facet<StatePayload, RootPayload> = defineFacet({
  reduce: () => {
    let callbacks: StatePayload[] = []

    const state: StatePayload = (ctx) => {
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

      assert(
        config.doc || config.schema,
        "Can't create state without a schema nor a document",
      )

      if (config.doc) {
        config.schema = undefined
      }

      return config
    }

    return function reducer(inputs) {
      callbacks = inputs
      return { state }
    }
  },
  singleton: true,
  parent: rootFacet,
})
