import { DefineComponent, DefineSetupFnComponent, MaybeRefOrGetter, ShallowRef } from "vue";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { MarkViewContext, NodeViewContext } from "@prosemirror-adapter/vue";
import { CoreMarkViewUserOptions, CoreNodeViewUserOptions } from "@prosemirror-adapter/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";
interface ProseKitProps {
  editor: Editor;
}
/**
 * The root component for a ProseKit editor.
 */
declare const ProseKit: DefineSetupFnComponent<ProseKitProps>;
interface VueMarkViewProps extends MarkViewContext {}
type VueMarkViewComponent = DefineComponent<VueMarkViewProps, any, any>;
/**
 * Options for {@link defineVueMarkView}.
 */
interface VueMarkViewOptions extends CoreMarkViewUserOptions<VueMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string;
}
/**
 * Defines a mark view using a Vue component.
 */
declare function defineVueMarkView(options: VueMarkViewOptions): Extension;
interface VueNodeViewProps extends NodeViewContext {}
type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>;
/**
 * Options for {@link defineVueNodeView}.
 */
interface VueNodeViewOptions extends CoreNodeViewUserOptions<VueNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string;
}
/**
 * Defines a node view using a Vue component.
 */
declare function defineVueNodeView(options: VueNodeViewOptions): Extension;
interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: MaybeRefOrGetter<Editor>;
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
 * The ref to an extension to add to the editor. If it changes, the previous
 * extension will be removed and the new one (if not null) will be added.
 */
extension: MaybeRefOrGetter<Extension | null>, options?: UseExtensionOptions): void;
/**
 * Calls the given handler whenever the editor document changes.
 */
declare function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void;
interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: MaybeRefOrGetter<Editor<E>>;
}
/**
 * Runs a function to derive a value from the editor instance after editor state
 * changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * It returns a shallow ref of the derived value that updates whenever the editor
 * state changes.
 */
declare function useEditorDerivedValue<E extends Extension, Derived>(
/**
 * A function that receives the editor instance and returns a derived value.
 *
 * It will be called whenever the editor's document state changes, or when it
 * mounts.
 */
derive: (editor: Editor<E>) => Derived, options?: UseEditorDerivedOptions<E>): ShallowRef<Derived>;
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
}): ShallowRef<Editor<E>>;
declare function useKeymap(keymap: MaybeRefOrGetter<Keymap>, options?: UseExtensionOptions): void;
/**
 * Calls the given handler whenever the editor state changes.
 */
declare function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
export { ProseKit, type ProseKitProps, type UseEditorDerivedOptions, type UseExtensionOptions, type VueMarkViewComponent, type VueMarkViewOptions, type VueMarkViewProps, type VueNodeViewComponent, type VueNodeViewOptions, type VueNodeViewProps, defineVueMarkView, defineVueNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=index.d.ts.map