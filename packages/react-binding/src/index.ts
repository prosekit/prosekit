'use client'

export { ProseKit, type ProseKitProps } from './components/prosekit.tsx'
export { ReactBindingEditor, createReactBindingEditor, type ReactBindingEditorOptions } from './editor/react-binding-editor.ts'
export type { ReactNodeViewComponent, ReactNodeViewProps } from './adapters/node-view-adapter.tsx'
export type { ReactMarkViewComponent, ReactMarkViewProps } from './adapters/mark-view-adapter.tsx'
export {
  defineReactNodeView,
  type ReactNodeViewOptions,
} from './extensions/node-view.ts'
export {
  defineReactMarkView,
  type ReactMarkViewOptions,
} from './extensions/mark-view.ts'
export { useEditor } from './hooks/use-editor.ts'
export { useEditorState } from './hooks/use-editor-state.ts'
export { useEditorEffect } from './hooks/use-editor-effect.ts'
export { useEditorDerivedValue, type UseEditorDerivedOptions } from './hooks/use-editor-derived-value.ts'
export { useExtension, type UseExtensionOptions } from './hooks/use-extension.ts'
export { useKeymap } from './hooks/use-keymap.ts'
export { useDocChange } from './hooks/use-doc-change.ts'
export { useStateUpdate } from './hooks/use-state-update.ts'
