import { Extension, PlainExtension, Union } from "@prosekit/core";
import { CursorAwareness, CursorEphemeralStore, CursorPluginOptions, LoroDocType, LoroSyncPluginProps, LoroSyncPluginProps as LoroSyncPluginProps$1, LoroUndoPluginProps, LoroUndoPluginProps as LoroUndoPluginProps$1 } from "loro-prosemirror";

//#region src/loro/loro-commands.d.ts
/**
 * @internal
 */
type LoroCommandsExtension = Extension<{
  Commands: {
    undo: [];
    redo: [];
  };
}>;
declare function defineLoroCommands(): LoroCommandsExtension;
//#endregion
//#region src/loro/loro.d.ts
interface LoroOptions {
  /**
   * The Loro instance handles the state of shared data.
   */
  doc: LoroDocType;
  /**
   * The (legacy) Awareness instance. One of `awareness` or `presence` must be provided.
   */
  awareness?: CursorAwareness;
  /**
   * The CursorEphemeralStore instance. One of `awareness` or `presence` must be provided.
   */
  presence?: CursorEphemeralStore;
  /**
   * Extra options for `LoroSyncPlugin`.
   */
  sync?: Omit<LoroSyncPluginProps$1, 'doc'>;
  /**
   * Extra options for the `LoroUndoPlugin`.
   */
  undo?: Omit<LoroUndoPluginProps$1, 'doc'>;
  /**
   * Extra options for `LoroCursorPlugin` or `LoroEphemeralCursorPlugin`.
   */
  cursor?: CursorPluginOptions;
}
/**
 * @internal
 */
type LoroExtension = Union<[LoroCommandsExtension, PlainExtension]>;
/**
 * @public
 */
declare function defineLoro(options: LoroOptions): LoroExtension;
//#endregion
//#region src/loro/loro-cursor-plugin.d.ts
interface LoroCursorOptions extends CursorPluginOptions {
  awareness?: CursorAwareness;
  presence?: CursorEphemeralStore;
}
declare function defineLoroCursorPlugin(options: LoroCursorOptions): PlainExtension;
//#endregion
//#region src/loro/loro-keymap.d.ts
declare function defineLoroKeymap(): PlainExtension;
//#endregion
//#region src/loro/loro-sync-plugin.d.ts
declare function defineLoroSyncPlugin(options: LoroSyncPluginProps$1): PlainExtension;
//#endregion
//#region src/loro/loro-undo-plugin.d.ts
declare function defineLoroUndoPlugin(options: LoroUndoPluginProps$1): PlainExtension;
//#endregion
export { type LoroCursorOptions, type LoroExtension, type LoroOptions, type LoroSyncPluginProps, type LoroUndoPluginProps, defineLoro, defineLoroCommands, defineLoroCursorPlugin, defineLoroKeymap, defineLoroSyncPlugin, defineLoroUndoPlugin };
//# sourceMappingURL=prosekit-extensions-loro.d.ts.map