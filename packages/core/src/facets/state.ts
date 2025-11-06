import type {
  Mark,
  ProseMirrorNode,
  Schema,
} from '@prosekit/pm/model'
import type { EditorStateConfig } from '@prosekit/pm/state'
import type {
  Plugin,
  Selection,
} from '@prosekit/pm/state'

import { toReversed } from '../utils/array'
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
      let doc: ProseMirrorNode | undefined
      let selection: Selection | undefined
      let schema: Schema | undefined = ctx.schema
      const markSet = new Set<Mark>()
      const pluginSet = new Set<Plugin>()

      // ProseKit resolves conflicts by letting later extensions override the
      // earlier ones, so `callbacks` is ordered from lowest to highest priority.
      // ProseMirror evaluates plugins in the opposite direction. Reverse the
      // list so we walk from highest to lowest priority while merging.
      const reversedCallbacks = toReversed(callbacks)

      for (const callback of reversedCallbacks) {
        const config = callback(ctx)

        doc = doc || config.doc
        selection = selection || config.selection
        schema = schema || config.schema

        for (const mark of (config.storedMarks ?? [])) {
          markSet.add(mark)
        }
        for (const plugin of (config.plugins ?? [])) {
          pluginSet.add(plugin)
        }
      }

      // If both doc and schema are provided, the schema is not needed.
      if (doc && schema) {
        schema = undefined
      }

      assert(
        doc || schema,
        "Can't create state without a schema nor a document",
      )

      return {
        doc,
        selection,
        schema,
        storedMarks: Array.from(markSet),
        plugins: Array.from(pluginSet),
      }
    }

    return function reducer(inputs) {
      callbacks = inputs
      return { state }
    }
  },
  singleton: true,
  parent: rootFacet,
})
