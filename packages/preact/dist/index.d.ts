import { ComponentChildren, ComponentType } from "preact";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { MarkViewContext, NodeViewContext } from "@prosemirror-adapter/preact";
import { CoreMarkViewUserOptions, CoreNodeViewUserOptions } from "@prosemirror-adapter/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";
interface ProseKitProps {
  editor: Editor;
  children?: ComponentChildren;
}
/**
 * The root component for a ProseKit editor.
 */
declare const ProseKit: ComponentType<ProseKitProps>;
interface PreactMarkViewProps extends MarkViewContext {}
type PreactMarkViewComponent = ComponentType<PreactMarkViewProps>;
/**
 * Options for {@link definePreactMarkView}.
 */
interface PreactMarkViewOptions extends CoreMarkViewUserOptions<PreactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string;
}
/**
 * Defines a mark view using a Preact component.
 */
declare function definePreactMarkView(options: PreactMarkViewOptions): Extension;
interface PreactNodeViewProps extends NodeViewContext {}
type PreactNodeViewComponent = ComponentType<PreactNodeViewProps>;
/**
 * Options for {@link definePreactNodeView}.
 */
interface PreactNodeViewOptions extends CoreNodeViewUserOptions<PreactNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string;
}
/**
 * Defines a node view using a Preact component.
 */
declare function definePreactNodeView(options: PreactNodeViewOptions): Extension;
interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: Editor;
  /**
   * Optional priority to add the extension with.
   */
  priority?: Priority;
}
/**
 * Add an extension to the editor.
 */
declare function useExtension(
/**
 * The extension to add to the editor. If it changes, the previous
 * extension will be removed and the new one (if not null) will be added.
 */
extension: Extension | null, options?: UseExtensionOptions): void;
/**
 * Calls the given handler whenever the editor document changes.
 */
declare function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void;
interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: Editor<E>;
}
/**
 * Runs a function to derive a value from the editor instance after editor state
 * changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * It returns the derived value that updates whenever the editor state changes.
 */
declare function useEditorDerivedValue<E extends Extension, Derived>(
/**
 * A function that receives the editor instance and returns a derived value.
 *
 * It will be called whenever the editor's document state changes, or when it
 * mounts.
 *
 * This function should be memoized.
 */
derive: (editor: Editor<E>) => Derived, options?: UseEditorDerivedOptions<E>): Derived;
/**
 * Retrieves the editor instance from the nearest ProseKit component.
 */
declare function useEditor<E extends Extension = any>(options?: {
  /**
   * Whether to update the component when the editor is mounted or editor state
   * is updated.
   *
   * @default false
   */
  update?: boolean;
}): Editor<E>;
declare function useKeymap(keymap: Keymap, options?: UseExtensionOptions): void;
/**
 * Calls the given handler whenever the editor state changes.
 */
declare function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
/**
 * @internal
 */
type PropsWithClass<P = unknown> = P & {
  class?: string | undefined;
  className?: string | undefined;
};
/**
 * @internal
 */
type PropsWithChildren<P = unknown> = P & {
  children?: ComponentChildren | undefined;
};
export { type PreactMarkViewComponent, type PreactMarkViewOptions, type PreactMarkViewProps, type PreactNodeViewComponent, type PreactNodeViewOptions, type PreactNodeViewProps, type PropsWithChildren, type PropsWithClass, ProseKit, type ProseKitProps, type UseEditorDerivedOptions, type UseExtensionOptions, definePreactMarkView, definePreactNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=index.d.ts.map