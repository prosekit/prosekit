export { addMark, type AddMarkOptions } from './commands/add-mark'
export { toggleMark, type ToggleMarkOptions } from './commands/toggle-mark'
export { toggleNode, type ToggleNodeOptions } from './commands/toggle-node'
export { Editor, createEditor, type EditorOptions } from './editor/editor'
export { Facet, FacetExtension, type FacetOptions } from './editor/facet'
export { defineExtension } from './editor/type-utils'
export { withPriority } from './editor/with-priority'
export { ProseKitError } from './error'
export { addBaseCommands, addCommands } from './extensions/command'
export {
  addDefaultState,
  type DefaultStateOptions,
} from './extensions/default-state'
export { addDoc } from './extensions/doc'
export { addEventHandler } from './extensions/event-handler'
export { addInputRule } from './extensions/input-rules'
export { addBaseKeymap, addKeymap, type Keymap } from './extensions/keymap'
export { addMarkSpec, type MarkSpecOptions } from './extensions/mark-spec'
export { addNodeSpec, type NodeSpecOptions } from './extensions/node-spec'
export { addNodeView, type NodeViewOptions } from './extensions/node-view'
export { addParagraph } from './extensions/paragraph'
export {
  addPlugin,
  pluginFacet,
  type PluginFacetInput,
} from './extensions/plugin'
export { addText } from './extensions/text'
export { type CommandArgs as CommandArgs } from './types/command'
export * from './types/editor'
export {
  type Extension,
  type ExtractCommandCreators,
  type ExtractCommandDispatchers,
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
