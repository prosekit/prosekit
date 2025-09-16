import { ComponentChildren, ComponentType } from "preact";
import { Editor, Extension, Keymap, Priority } from "@prosekit/core";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorState } from "@prosekit/pm/state";

//#region src/components/prosekit.d.ts
interface ProseKitProps {
  editor: Editor;
  children?: ComponentChildren;
}
/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
declare const ProseKit: ComponentType<ProseKitProps>;
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
   * @default false
   */
  update?: boolean;
}): Editor<E>;
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
//#endregion
export { type PropsWithChildren, type PropsWithClass, ProseKit, type ProseKitProps, type UseExtensionOptions, useDocChange, useEditor, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-preact.d.ts.map