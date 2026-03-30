export { addMark, type AddMarkOptions } from './commands/add-mark.ts'
export { expandMark, type ExpandMarkOptions } from './commands/expand-mark.ts'
export { insertDefaultBlock, type InsertDefaultBlockOptions } from './commands/insert-default-block.ts'
export { insertNode, type InsertNodeOptions } from './commands/insert-node.ts'
export { removeMark, type RemoveMarkOptions } from './commands/remove-mark.ts'
export { removeNode, type RemoveNodeOptions } from './commands/remove-node.ts'
export { selectAll } from './commands/select-all.ts'
export { selectBlock } from './commands/select-block.ts'
export { setBlockType, type SetBlockTypeOptions } from './commands/set-block-type.ts'
export { setNodeAttrsBetween, type SetNodeAttrsBetweenOptions } from './commands/set-node-attrs-between.ts'
export { setNodeAttrs, type SetNodeAttrsOptions } from './commands/set-node-attrs.ts'
export { toggleMark, type ToggleMarkOptions } from './commands/toggle-mark.ts'
export { toggleNode, type ToggleNodeOptions } from './commands/toggle-node.ts'
export { toggleWrap, type ToggleWrapOptions } from './commands/toggle-wrap.ts'
export { unsetBlockType, type UnsetBlockTypeOptions } from './commands/unset-block-type.ts'
export { unsetMark, type UnsetMarkOptions } from './commands/unset-mark.ts'
export { wrap, type WrapOptions } from './commands/wrap.ts'
export type { MarkAction, NodeAction, NodeChild } from './editor/action.ts'
export { createEditor, Editor, type EditorOptions } from './editor/editor.ts'
export { union } from './editor/union.ts'
export { withPriority } from './editor/with-priority.ts'
export { EditorNotFoundError, ProseKitError } from './error.ts'
export { defineClipboardSerializer, type ClipboardSerializerOptions } from './extensions/clipboard-serializer.ts'
export { defineBaseCommands, defineCommands, type BaseCommandsExtension } from './extensions/command.ts'
export { defineDefaultState, type DefaultStateOptions } from './extensions/default-state.ts'
export { defineDocChangeHandler, type DocChangeHandler } from './extensions/events/doc-change.ts'
export { defineDOMEventHandler, type DOMEventHandler } from './extensions/events/dom-event.ts'
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
} from './extensions/events/editor-event.ts'
export { defineFocusChangeHandler, type FocusChangeHandler } from './extensions/events/focus.ts'
export {
  defineMountHandler,
  defineUnmountHandler,
  defineUpdateHandler,
  type MountHandler,
  type UnmountHandler,
  type UpdateHandler,
} from './extensions/events/plugin-view.ts'
export { defineHistory, type HistoryExtension, type HistoryOptions } from './extensions/history.ts'
export { defineBaseKeymap, type BaseKeymapExtension, type BaseKeymapOptions } from './extensions/keymap-base.ts'
export { defineKeymap, keymapFacet, type Keymap, type KeymapPayload } from './extensions/keymap.ts'
export { defineMarkAttr, defineMarkSpec, type MarkAttrOptions, type MarkSpecOptions } from './extensions/mark-spec.ts'
export {
  defineMarkViewComponent,
  defineMarkViewFactory,
  type MarkViewComponentOptions,
  type MarkViewFactoryOptions,
} from './extensions/mark-view-effect.ts'
export { defineMarkView, type MarkViewOptions } from './extensions/mark-view.ts'
export { defineNodeAttr, defineNodeSpec, type NodeAttrOptions, type NodeSpecOptions } from './extensions/node-spec.ts'
export {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type NodeViewComponentOptions,
  type NodeViewFactoryOptions,
} from './extensions/node-view-effect.ts'
export { defineNodeView, type NodeViewOptions } from './extensions/node-view.ts'
export { definePlugin, pluginFacet, type PluginPayload } from './extensions/plugin.ts'
export { defineFacetPayload } from './facets/facet-extension.ts'
export { defineFacet, type Facet } from './facets/facet.ts'
export type { AnyFunction } from './types/any-function.ts'
export type { AnyAttrs, AttrSpec } from './types/attrs.ts'
export type { CommandAction, CommandTyping } from './types/extension-command.ts'
export type { MarkTyping, ToMarkAction } from './types/extension-mark.ts'
export type { NodeTyping, ToNodeAction } from './types/extension-node.ts'
export type {
  Extension,
  ExtensionTyping,
  ExtractCommandActions,
  ExtractCommandCreators,
  ExtractCommands,
  ExtractMarkActions,
  ExtractMarks,
  ExtractNodeActions,
  ExtractNodes,
  ExtractTyping,
  PlainExtension,
  Union,
} from './types/extension.ts'
export type { NodeJSON, SelectionJSON, StateJSON, StepJSON } from './types/model.ts'
export type { PickSubType } from './types/pick-sub-type.ts'
export { Priority } from './types/priority.ts'
export type { SimplifyDeeper } from './types/simplify-deeper.ts'
export type { SimplifyUnion } from './types/simplify-union.ts'
export { assert } from './utils/assert.ts'
export { canUseRegexLookbehind } from './utils/can-use-regex-lookbehind.ts'
export { clsx } from './utils/clsx.ts'
export { containsInlineNode } from './utils/contains-inline-node.ts'
export { defaultBlockAt } from './utils/default-block-at.ts'
export { isApple } from './utils/env.ts'
export { findNode, findNodes, type FindNodeResult } from './utils/find-node.ts'
export { findParentNodeOfType } from './utils/find-parent-node-of-type.ts'
export { findParentNode, type FindParentNodeResult } from './utils/find-parent-node.ts'
export { getMarkType } from './utils/get-mark-type.ts'
export { getNodeType } from './utils/get-node-type.ts'
export { isAtBlockStart } from './utils/is-at-block-start.ts'
export { isInCodeBlock } from './utils/is-in-code-block.ts'
export { isMarkAbsent } from './utils/is-mark-absent.ts'
export { isMarkActive } from './utils/is-mark-active.ts'
export { maybeRun } from './utils/maybe-run.ts'
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
} from './utils/parse.ts'
export { setSelectionAround } from './utils/set-selection-around.ts'
export {
  isAllSelection,
  isFragment,
  isMark,
  isNodeSelection,
  isProseMirrorNode,
  isSelection,
  isSlice,
  isTextSelection,
} from './utils/type-assertion.ts'
export * from './utils/unicode.ts'
export { withSkipCodeBlock } from './utils/with-skip-code-block.ts'
