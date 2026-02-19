export { ProseKit, type ProseKitProps } from './components/prosekit.ts'
export {
  defineSolidMarkView,
  type SolidMarkViewComponent,
  type SolidMarkViewOptions,
  type SolidMarkViewProps,
} from './extensions/solid-mark-view.ts'
export {
  defineSolidNodeView,
  type SolidNodeViewComponent,
  type SolidNodeViewOptions,
  type SolidNodeViewProps,
} from './extensions/solid-node-view.ts'
export { useDocChange } from './hooks/use-doc-change.ts'
export { useEditorDerivedValue, type UseEditorDerivedOptions } from './hooks/use-editor-derived-value.ts'
export { useEditor } from './hooks/use-editor.ts'
export { useExtension, type UseExtensionOptions } from './hooks/use-extension.ts'
export { useKeymap } from './hooks/use-keymap.ts'
export { useStateUpdate } from './hooks/use-state-update.ts'
export type { MaybeAccessor, PropsWithChildren, PropsWithClass, PropsWithElement } from './types.ts'
