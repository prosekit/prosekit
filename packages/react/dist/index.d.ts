import { ComponentType, ReactNode } from "react";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { MarkViewContext, NodeViewContext } from "@prosemirror-adapter/react";
import { CoreMarkViewUserOptions, CoreNodeViewUserOptions } from "@prosemirror-adapter/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";
interface ProseKitProps {
  editor: Editor;
  children?: ReactNode;
}
/**
 * The root component for a ProseKit editor.
 */
declare const ProseKit: ComponentType<ProseKitProps>;
interface ReactMarkViewProps extends MarkViewContext {}
type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>;
/**
 * Options for {@link defineReactMarkView}.
 */
interface ReactMarkViewOptions extends CoreMarkViewUserOptions<ReactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string;
}
/**
 * Defines a mark view using a React component.
 */
declare function defineReactMarkView(options: ReactMarkViewOptions): Extension;
interface ReactNodeViewProps extends NodeViewContext {}
type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>;
/**
 * Options for {@link defineReactNodeView}.
 */
interface ReactNodeViewOptions extends CoreNodeViewUserOptions<ReactNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string;
}
/**
 * Defines a node view using a React component.
 */
declare function defineReactNodeView(options: ReactNodeViewOptions): Extension;
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
   * Note this this option doesn't work with [React
   * compiler](https://react.dev/learn/react-compiler) because the returned
   * editor will be the same instance after state updates. If you're using React
   * compiler, you should use {@link useEditorDerivedValue} instead.
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
type PropsWithClassName<P = unknown> = P & {
  className?: string | undefined;
};
export { type PropsWithClassName, ProseKit, type ProseKitProps, type ReactMarkViewComponent, type ReactMarkViewOptions, type ReactMarkViewProps, type ReactNodeViewComponent, type ReactNodeViewOptions, type ReactNodeViewProps, type UseEditorDerivedOptions, type UseExtensionOptions, defineReactMarkView, defineReactNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=index.d.ts.map