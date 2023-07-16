import { Schema } from '@prosekit/pm/model'
import type { EditorStateConfig } from '@prosekit/pm/state'
import type { DirectEditorProps } from '@prosekit/pm/view'

export interface StateConfigContext {
  schema: Schema
}

export type StateConfigCallback = (ctx: StateConfigContext) => EditorStateConfig

export type ViewProps = Omit<DirectEditorProps, 'state'>
