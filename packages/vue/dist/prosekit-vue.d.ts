import { MarkViewContext, NodeViewContext } from "@prosemirror-adapter/vue";
import { DefineComponent, DefineSetupFnComponent, MaybeRefOrGetter, ShallowRef } from "vue";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { CoreMarkViewUserOptions, CoreNodeViewUserOptions } from "@prosemirror-adapter/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";

//#region src/components/prosekit.d.ts
interface ProseKitProps {
  editor: Editor;
}
/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
declare const ProseKit: DefineSetupFnComponent<ProseKitProps>;
//#endregion
//#region src/extensions/vue-mark-view.d.ts
/**
 * @public
 */
interface VueMarkViewProps extends MarkViewContext {}
/**
 * @public
 */
type VueMarkViewComponent = DefineComponent<VueMarkViewProps, any, any>;
/**
 * Options for {@link defineVueMarkView}.
 *
 * @public
 */
interface VueMarkViewOptions extends CoreMarkViewUserOptions<VueMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string;
}
/**
 * Defines a mark view using a Vue component.
 *
 * @public
 */
declare function defineVueMarkView(options: VueMarkViewOptions): Extension;
//#endregion
//#region src/extensions/vue-node-view.d.ts
/**
 * @public
 */
interface VueNodeViewProps extends NodeViewContext {}
/**
 * @public
 */
type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>;
/**
 * Options for {@link defineVueNodeView}.
 *
 * @public
 */
interface VueNodeViewOptions extends CoreNodeViewUserOptions<VueNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string;
}
/**
 * Defines a node view using a Vue component.
 *
 * @public
 */
declare function defineVueNodeView(options: VueNodeViewOptions): Extension;
//#endregion
//#region src/hooks/use-extension.d.ts
interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
   */
  editor?: MaybeRefOrGetter<Editor>;
  /**
   * Optional priority to add the extension with.
   */
  priority?: Priority;
}
/**
 * Add an extension to the editor.
 *
 * @public
 */
declare function useExtension(
/**
 * The ref to an extension to add to the editor. If it changes, the previous
 * extension will be removed and the new one (if not null) will be added.
 */
extension: MaybeRefOrGetter<Extension | null>, options?: UseExtensionOptions): void;
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
}): ShallowRef<Editor<E>>;
//#endregion
//#region src/hooks/use-keymap.d.ts
declare function useKeymap(keymap: MaybeRefOrGetter<Keymap>, options?: UseExtensionOptions): void;
//#endregion
//#region src/hooks/use-state-update.d.ts
/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
declare function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
//#endregion
export { ProseKit, type ProseKitProps, type UseExtensionOptions, type VueMarkViewComponent, type VueMarkViewOptions, type VueMarkViewProps, type VueNodeViewComponent, type VueNodeViewOptions, type VueNodeViewProps, defineVueMarkView, defineVueNodeView, useDocChange, useEditor, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-vue.d.ts.map