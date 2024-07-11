export { addMark, type AddMarkOptions } from './commands/add-mark'
export { expandMark, type ExpandMarkOptions } from './commands/expand-mark'
export { insertNode, type InsertNodeOptions } from './commands/insert-node'
export { removeMark, type RemoveMarkOptions } from './commands/remove-mark'
export { removeNode, type RemoveNodeOptions } from './commands/remove-node'
export {
  setBlockType,
  type SetBlockTypeOptions,
} from './commands/set-block-type'
export {
  setNodeAttrs,
  type SetNodeAttrsOptions,
} from './commands/set-node-attrs'
export { toggleMark, type ToggleMarkOptions } from './commands/toggle-mark'
export { toggleNode, type ToggleNodeOptions } from './commands/toggle-node'
export {
  unsetBlockType,
  type UnsetBlockTypeOptions,
} from './commands/unset-block-type'
export { unsetMark, type UnsetMarkOptions } from './commands/unset-mark'
export { wrap, type WrapOptions } from './commands/wrap'
export type { MarkBuilder, NodeBuilder } from './editor/builder'
export { Editor, createEditor, type EditorOptions } from './editor/editor'
export { union } from './editor/union'
export { withPriority } from './editor/with-priority'
export { EditorNotFoundError, ProseKitError } from './error'
export { defineBaseCommands, defineCommands } from './extensions/command'
export {
  defineDefaultState,
  type DefaultStateOptions,
} from './extensions/default-state'
export { defineDoc } from './extensions/doc'
export {
  defineDocChangeHandler,
  type DocChangeHandler,
} from './extensions/events/doc-change'
export {
  defineDOMEventHandler,
  type DOMEventHandler,
} from './extensions/events/dom-event'
export {
  defineClickHandler,
  defineClickOnHandler,
  defineDoubleClickHandler,
  defineDoubleClickOnHandler,
  defineDropHandler,
  defineKeyDownHandler,
  defineKeyPressHandler,
  definePasteHandler,
  defineScrollToSelectionHandler,
  defineTextInputHandler,
  defineTripleClickHandler,
  defineTripleClickOnHandler,
  type ClickHandler,
  type ClickOnHandler,
  type DoubleClickHandler,
  type DoubleClickOnHandler,
  type DropHandler,
  type KeyDownHandler,
  type KeyPressHandler,
  type PasteHandler,
  type ScrollToSelectionHandler,
  type TextInputHandler,
  type TripleClickHandler,
  type TripleClickOnHandler,
} from './extensions/events/editor-event'
export {
  defineFocusChangeHandler,
  type FocusChangeHandler,
} from './extensions/events/focus'
export {
  defineMountHandler,
  defineUnmountHandler,
  defineUpdateHandler,
  type MountHandler,
  type UnmountHandler,
  type UpdateHandler,
} from './extensions/events/plugin-view'
export { defineHistory } from './extensions/history'
export {
  defineKeymap,
  keymapFacet,
  type Keymap,
  type KeymapPayload,
} from './extensions/keymap'
export { defineBaseKeymap } from './extensions/keymap-base'
export {
  defineMarkAttr,
  defineMarkSpec,
  type MarkAttrOptions,
  type MarkSpecOptions,
} from './extensions/mark-spec'
export {
  defineNodeAttr,
  defineNodeSpec,
  type NodeAttrOptions,
  type NodeSpecOptions,
} from './extensions/node-spec'
export { defineNodeView, type NodeViewOptions } from './extensions/node-view'
export {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type NodeViewComponentOptions,
  type NodeViewFactoryOptions,
} from './extensions/node-view-effect'
export { defineParagraph } from './extensions/paragraph'
export {
  definePlugin,
  pluginFacet,
  type PluginPayload,
} from './extensions/plugin'
export { defineText } from './extensions/text'
export { defineFacet, type Facet } from './facets/facet'
export { defineFacetPayload } from './facets/facet-extension'
export type { BaseNodeViewOptions } from './types/base-node-view-options'
export type { CommandTyping } from './types/command'
export type {
  Extension,
  ExtensionTyping,
  ExtractCommandAppliers,
  ExtractCommandCreators,
  ExtractMarks,
  ExtractNodes,
  UnionExtension,
} from './types/extension'
export type {
  NodeJSON,
  SelectionJSON,
  StateJSON,
  StepJSON,
} from './types/model'
export { Priority } from './types/priority'
export type { SimplifyUnion } from './types/simplify-union'
export { assert } from './utils/assert'
export { canUseRegexLookbehind } from './utils/can-use-regex-lookbehind'
export { clsx } from './utils/clsx'
export { collectNodes, type NodeContent } from './utils/collect-nodes'
export { defaultBlockAt } from './utils/default-block-at'
export { isApple } from './utils/env'
export { getId as _getId } from './utils/get-id'
export { getMarkType } from './utils/get-mark-type'
export { getNodeType } from './utils/get-node-type'
export { isAtBlockStart } from './utils/is-at-block-start'
export { isInCodeBlock } from './utils/is-in-code-block'
export { isMarkAbsent } from './utils/is-mark-absent'
export { isMarkActive } from './utils/is-mark-active'
export { maybeRun } from './utils/maybe-run'
export {
  elementFromJSON,
  elementFromNode,
  htmlFromJSON,
  htmlFromNode,
  jsonFromHTML,
  jsonFromNode,
  jsonFromState,
  nodeFromElement,
  nodeFromHTML,
  nodeFromJSON,
  stateFromJSON,
  type DOMDocumentOptions,
  type DOMParserOptions,
  type DOMSerializerOptions,
  type JSONParserOptions,
} from './utils/parse'
export {
  isAllSelection,
  isMark,
  isNodeSelection,
  isProseMirrorNode,
  isTextSelection,
} from './utils/type-assertion'
export * from './utils/unicode'
export { withSkipCodeBlock } from './utils/with-skip-code-block'
