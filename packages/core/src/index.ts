export {
  addMark,
  type AddMarkOptions,
} from './commands/add-mark'
export {
  expandMark,
  type ExpandMarkOptions,
} from './commands/expand-mark'
export {
  insertDefaultBlock,
  type InsertDefaultBlockOptions,
} from './commands/insert-default-block'
export {
  insertNode,
  type InsertNodeOptions,
} from './commands/insert-node'
export {
  removeMark,
  type RemoveMarkOptions,
} from './commands/remove-mark'
export {
  removeNode,
  type RemoveNodeOptions,
} from './commands/remove-node'
export {
  setBlockType,
  type SetBlockTypeOptions,
} from './commands/set-block-type'
export {
  setNodeAttrs,
  type SetNodeAttrsOptions,
} from './commands/set-node-attrs'
export {
  toggleMark,
  type ToggleMarkOptions,
} from './commands/toggle-mark'
export {
  toggleNode,
  type ToggleNodeOptions,
} from './commands/toggle-node'
export {
  toggleWrap,
  type ToggleWrapOptions,
} from './commands/toggle-wrap'
export {
  unsetBlockType,
  type UnsetBlockTypeOptions,
} from './commands/unset-block-type'
export {
  unsetMark,
  type UnsetMarkOptions,
} from './commands/unset-mark'
export {
  wrap,
  type WrapOptions,
} from './commands/wrap'
export type {
  MarkAction,
  MarkBuilder,
  NodeAction,
  NodeBuilder,
  NodeChild,
} from './editor/action'
export {
  createEditor,
  Editor,
  type EditorOptions,
} from './editor/editor'
export { union } from './editor/union'
export { withPriority } from './editor/with-priority'
export {
  EditorNotFoundError,
  ProseKitError,
} from './error'
export {
  defineClipboardSerializer,
  type ClipboardSerializerOptions,
} from './extensions/clipboard-serializer'
export {
  defineBaseCommands,
  defineCommands,
  type BaseCommandsExtension,
} from './extensions/command'
export {
  defineDefaultState,
  type DefaultStateOptions,
} from './extensions/default-state'
export {
  defineDoc,
  type DocExtension,
} from './extensions/doc'
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
  editorEventFacet,
  type ClickHandler,
  type ClickOnHandler,
  type DoubleClickHandler,
  type DoubleClickOnHandler,
  type DropHandler,
  type EditorEventPayload,
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
export {
  defineHistory,
  type HistoryExtension,
  type HistoryOptions,
} from './extensions/history'
export {
  defineKeymap,
  keymapFacet,
  type Keymap,
  type KeymapPayload,
} from './extensions/keymap'
export {
  defineBaseKeymap,
  type BaseKeymapExtension,
} from './extensions/keymap-base'
export {
  defineMarkAttr,
  defineMarkSpec,
  type MarkAttrOptions,
  type MarkSpecOptions,
} from './extensions/mark-spec'
export {
  defineMarkView,
  type MarkViewOptions,
} from './extensions/mark-view'
export {
  defineMarkViewComponent,
  defineMarkViewFactory,
  type MarkViewComponentOptions,
  type MarkViewFactoryOptions,
} from './extensions/mark-view-effect'
export {
  defineNodeAttr,
  defineNodeSpec,
  type NodeAttrOptions,
  type NodeSpecOptions,
} from './extensions/node-spec'
export {
  defineNodeView,
  type NodeViewOptions,
} from './extensions/node-view'
export {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type NodeViewComponentOptions,
  type NodeViewFactoryOptions,
} from './extensions/node-view-effect'
export {
  defineParagraph,
  type ParagraphExtension,
} from './extensions/paragraph'
export {
  definePlugin,
  pluginFacet,
  type PluginPayload,
} from './extensions/plugin'
export {
  defineText,
  type TextExtension,
} from './extensions/text'
export {
  defineFacet,
  type Facet,
} from './facets/facet'
export { defineFacetPayload } from './facets/facet-extension'
export type { AnyFunction } from './types/any-function'
export type {
  AnyAttrs,
  AttrSpec,
} from './types/attrs'
export type { BaseNodeViewOptions } from './types/base-node-view-options'
export type {
  Extension,
  ExtensionTyping,
  ExtractCommandActions,
  ExtractCommandAppliers,
  ExtractCommandCreators,
  ExtractMarkActions,
  ExtractMarks,
  ExtractNodeActions,
  ExtractNodes,
  PlainExtension,
  Union,
  UnionExtension,
} from './types/extension'
export type {
  CommandAction,
  CommandTyping,
} from './types/extension-command'
export type {
  MarkTyping,
  ToMarkAction,
} from './types/extension-mark'
export type {
  NodeTyping,
  ToNodeAction,
} from './types/extension-node'
export type {
  NodeJSON,
  SelectionJSON,
  StateJSON,
  StepJSON,
} from './types/model'
export type { PickSubType } from './types/pick-sub-type'
export { Priority } from './types/priority'
export type { SimplifyDeeper } from './types/simplify-deeper'
export type { SimplifyUnion } from './types/simplify-union'
export { assert } from './utils/assert'
export { canUseRegexLookbehind } from './utils/can-use-regex-lookbehind'
export { clsx } from './utils/clsx'
export { collectChildren } from './utils/collect-children'
export {
  collectNodes,
  type NodeContent,
} from './utils/collect-nodes'
export { containsInlineNode } from './utils/contains-inline-node'
export { defaultBlockAt } from './utils/default-block-at'
export { isApple } from './utils/env'
export {
  findParentNode,
  type FindParentNodeResult,
} from './utils/find-parent-node'
export { findParentNodeOfType } from './utils/find-parent-node-of-type'
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
export { setSelectionAround } from './utils/set-selection-around'
export {
  isAllSelection,
  isFragment,
  isMark,
  isNodeSelection,
  isProseMirrorNode,
  isSelection,
  isSlice,
  isTextSelection,
} from './utils/type-assertion'
export * from './utils/unicode'
export { withSkipCodeBlock } from './utils/with-skip-code-block'

let cachedMessages: string[] = []

export function debug(message: string): void {
  if (!cachedMessages.includes(message)) {
    console.debug(message)
    cachedMessages.push(message)
  }
  if (cachedMessages.length > 3) {
    cachedMessages.shift()
  }
}
