export { addMark, type AddMarkOptions } from './commands/add-mark'
export { toggleMark, type ToggleMarkOptions } from './commands/toggle-mark'
export { toggleNode, type ToggleNodeOptions } from './commands/toggle-node'
export { Editor, createEditor, type EditorOptions } from './editor/editor'
export { Facet, FacetExtension, type FacetOptions } from './editor/facet'
export { union } from './editor/type-utils'
export { withPriority } from './editor/with-priority'
export { ProseKitError } from './error'
export { defineBaseCommands, defineCommands } from './extensions/command'
export {
  defineDefaultState,
  type DefaultStateOptions,
} from './extensions/default-state'
export { defineDoc } from './extensions/doc'
export { defineEventHandler } from './extensions/event-handler'
export { defineHistory } from './extensions/history'
export { defineInputRule } from './extensions/input-rules'
export {
  defineBaseKeymap,
  defineKeymap,
  type Keymap,
} from './extensions/keymap'
export { defineMarkSpec, type MarkSpecOptions } from './extensions/mark-spec'
export { defineNodeSpec, type NodeSpecOptions } from './extensions/node-spec'
export { defineNodeView, type NodeViewOptions } from './extensions/node-view'
export {
  defineNodeViewEffect,
  type NodeViewEffectOptions,
} from './extensions/node-view-effect'
export { defineParagraph } from './extensions/paragraph'
export {
  definePlugin,
  pluginFacet,
  type PluginFacetInput,
} from './extensions/plugin'
export { defineText } from './extensions/text'
export { type CommandArgs as CommandArgs } from './types/command'
export * from './types/editor'
export {
  type Extension,
  type ExtractCommandAppliers,
  type ExtractCommandCreators,
  type ExtractMarks,
  type ExtractNodes,
  type SimplifyExtension,
} from './types/extension'
export { type ExtensionTyping } from './types/extension-typing'
export type { NodeJson, SelectionJson, StateJson } from './types/model'
export { Priority } from './types/priority'
export { type SimplifyUnion } from './types/simplify-union'
export { getMarkType } from './utils/get-mark-type'
export { getNodeType } from './utils/get-node-type'
