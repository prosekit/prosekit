import type { Schema } from '@prosekit/pm/model'
import type { EditorStateConfig } from '@prosekit/pm/state'
import type { DirectEditorProps } from '@prosekit/pm/view'

import type { CommandCreators } from '../types/extension-command.ts'

import { Facet } from './facet.ts'

export type RootPayload = {
  schema?: Schema | null
  commands?: CommandCreators
  state?: (ctx: { schema: Schema }) => EditorStateConfig
  view?: Omit<DirectEditorProps, 'state'>
}

export type RootOutput = {
  schema?: Schema | null
  commands?: CommandCreators
  state?: EditorStateConfig
  view?: Omit<DirectEditorProps, 'state'>
}

function rootReducer(inputs: RootPayload[]): RootOutput {
  let schema: Schema | undefined
  let commands: CommandCreators | undefined
  let stateFunc: ((ctx: { schema: Schema }) => EditorStateConfig) | undefined
  let view: Omit<DirectEditorProps, 'state'> | undefined

  for (const input of inputs) {
    schema = input.schema || schema
    commands = input.commands || commands
    stateFunc = input.state || stateFunc
    view = input.view || view
  }

  const state = schema && (stateFunc?.({ schema }) ?? { schema })

  return { schema, state, commands, view }
}

export const rootFacet: Facet<RootPayload, RootOutput> = new Facet<
  RootPayload,
  RootOutput
>(null, true, rootReducer)
