import { MarkViewContext, NodeViewContext } from "@prosemirror-adapter/react";
import { ComponentType, ReactNode } from "react";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { CoreMarkViewUserOptions, CoreNodeViewUserOptions } from "@prosemirror-adapter/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";

//#region src/components/prosekit.d.ts
interface ProseKitProps {
  editor: Editor;
  children?: ReactNode;
}
/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
declare const ProseKit: ComponentType<ProseKitProps>;
//#endregion
//#region src/extensions/react-mark-view.d.ts
/**
 * @public
 */
interface ReactMarkViewProps extends MarkViewContext {}
/**
 * @public
 */
type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>;
/**
 * Options for {@link defineReactMarkView}.
 *
 * @public
 */
interface ReactMarkViewOptions extends CoreMarkViewUserOptions<ReactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string;
}
/**
 * Defines a mark view using a React component.
 *
 * @public
 */
declare function defineReactMarkView(options: ReactMarkViewOptions): Extension;
//#endregion
//#region src/extensions/react-node-view.d.ts
/**
 * @public
 */
interface ReactNodeViewProps extends NodeViewContext {}
/**
 * @public
 */
type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>;
/**
 * Options for {@link defineReactNodeView}.
 *
 * @public
 */
interface ReactNodeViewOptions extends CoreNodeViewUserOptions<ReactNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string;
}
/**
 * Defines a node view using a React component.
 *
 * @public
 */
declare function defineReactNodeView(options: ReactNodeViewOptions): Extension;
//#endregion
//#region src/hooks/use-extension.d.ts
interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
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
//#endregion
//#region src/hooks/use-doc-change.d.ts
/**
 * Calls the given handler whenever the editor document changes.
 *
 * @public
 */
declare function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void;
//#endregion
//#region src/hooks/use-editor.d.ts
/**
 * Retrieves the editor instance from the nearest ProseKit component.
 *
 * @public
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
//#endregion
//#region src/hooks/use-editor-derived-value.d.ts
interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
   */
  editor?: Editor<E>;
}
/**
 * A hook that runs a function to derive a value from the editor instance after
 * editor state changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * @public
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
//#endregion
//#region src/hooks/use-keymap.d.ts
declare function useKeymap(keymap: Keymap, options?: UseExtensionOptions): void;
//#endregion
//#region src/hooks/use-state-update.d.ts
/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
declare function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
//#endregion
//#region src/types.d.ts
/**
 * @internal
 */
type PropsWithClassName<P = unknown> = P & {
  className?: string | undefined;
};
//#endregion
export { type PropsWithClassName, ProseKit, type ProseKitProps, type ReactMarkViewComponent, type ReactMarkViewOptions, type ReactMarkViewProps, type ReactNodeViewComponent, type ReactNodeViewOptions, type ReactNodeViewProps, type UseEditorDerivedOptions, type UseExtensionOptions, defineReactMarkView, defineReactNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-react.d.ts.map