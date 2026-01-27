import { i as PropsWithElement, n as PropsWithChildren, r as PropsWithClass, t as MaybeAccessor } from "./types-Bx9mKDTJ.js";
import { MarkViewContextProps, NodeViewContextProps } from "@prosemirror-adapter/solid";
import { Accessor, Component, ParentProps } from "solid-js";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { CoreMarkViewUserOptions, CoreNodeViewUserOptions } from "@prosemirror-adapter/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";

//#region src/components/prosekit.d.ts
type ProseKitProps = ParentProps<{
  editor: Editor;
}>;
/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
declare const ProseKit: Component<ProseKitProps>;
//#endregion
//#region src/extensions/solid-mark-view.d.ts
/**
 * @public
 */
interface SolidMarkViewProps extends MarkViewContextProps {}
/**
 * @public
 */
type SolidMarkViewComponent = Component<SolidMarkViewProps>;
/**
 * Options for {@link defineSolidMarkView}.
 *
 * @public
 */
interface SolidMarkViewOptions extends CoreMarkViewUserOptions<SolidMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string;
}
/**
 * Defines a mark view using a Solid component.
 *
 * @public
 */
declare function defineSolidMarkView(options: SolidMarkViewOptions): Extension;
//#endregion
//#region src/extensions/solid-node-view.d.ts
/**
 * @public
 */
interface SolidNodeViewProps extends NodeViewContextProps {}
/**
 * @public
 */
type SolidNodeViewComponent = Component<SolidNodeViewProps>;
/**
 * Options for {@link defineSolidNodeView}.
 *
 * @public
 */
interface SolidNodeViewOptions extends CoreNodeViewUserOptions<SolidNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string;
}
/**
 * Defines a node view using a Solid component.
 *
 * @public
 */
declare function defineSolidNodeView(options: SolidNodeViewOptions): Extension;
//#endregion
//#region src/hooks/use-extension.d.ts
interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: MaybeAccessor<Editor>;
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
 * The accessor to an extension to add to the editor. If it changes, the previous
 * extension will be removed and the new one (if not null) will be added.
 */

extension: Accessor<Extension | null>, options?: UseExtensionOptions): void;
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
   * @default false
   */
  update?: boolean;
}): () => Editor<E>;
//#endregion
//#region src/hooks/use-editor-derived-value.d.ts
interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: MaybeAccessor<Editor<E>>;
}
/**
 * Runs a function to derive a value from the editor instance after editor state
 * changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * It returns an accessor of the derived value that updates whenever the editor
 * state changes.
 *
 * @public
 */
declare function useEditorDerivedValue<E extends Extension, Derived>(
/**
 * A function that receives the editor instance and returns a derived value.
 *
 * It will be called whenever the editor's document state changes, or when it
 * mounts.
 */

derive: (editor: Editor<E>) => Derived, options?: UseEditorDerivedOptions<E>): Accessor<Derived>;
//#endregion
//#region src/hooks/use-keymap.d.ts
declare function useKeymap(keymap: () => Keymap, options?: UseExtensionOptions): void;
//#endregion
//#region src/hooks/use-state-update.d.ts
/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
declare function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
//#endregion
export { type MaybeAccessor, type PropsWithChildren, type PropsWithClass, type PropsWithElement, ProseKit, type ProseKitProps, type SolidMarkViewComponent, type SolidMarkViewOptions, type SolidMarkViewProps, type SolidNodeViewComponent, type SolidNodeViewOptions, type SolidNodeViewProps, type UseEditorDerivedOptions, type UseExtensionOptions, defineSolidMarkView, defineSolidNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-solid.d.ts.map