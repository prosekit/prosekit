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
    // An array of state payloads from lower to higher priority.
    let callbacks: StatePayload[] = []

    const state: StatePayload = (ctx) => {
      let doc: ProseMirrorNode | undefined
      let selection: Selection | undefined
      let schema: Schema | undefined = ctx.schema
      const markSet = new Set<Mark>()
      const pluginSet = new Set<Plugin>()

      // An array of state payloads from higher to lower priority. This matches the
      // order of plugins required by ProseMirror.
      const reversedCallbacks = toReversed(callbacks)

      for (const callback of reversedCallbacks) {
        const config = callback(ctx)

        doc ||= config.doc
        selection ||= config.selection
        schema ||= config.schema

        for (const mark of (config.storedMarks ?? [])) {
          markSet.add(mark)
        }

        for (const plugin of (config.plugins ?? [])) {
          // `config.plugins` is an array of plugins from higher to lower priority.
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
