import { Extension, PlainExtension, Union } from "@prosekit/core";
import { EditorState, Selection } from "@prosekit/pm/state";
import { DecorationAttrs } from "@prosekit/pm/view";
import { CursorAwareness, LoroDocType, LoroSyncPluginProps, LoroSyncPluginProps as LoroSyncPluginProps$1, LoroSyncPluginProps as LoroSyncPluginProps$2, LoroUndoPluginProps, LoroUndoPluginProps as LoroUndoPluginProps$1, LoroUndoPluginProps as LoroUndoPluginProps$2 } from "loro-prosemirror";
import { PeerID } from "loro-crdt";

//#region src/loro/loro-commands.d.ts
/**
* @internal
*/
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
//#region src/loro/loro-cursor-plugin.d.ts
interface LoroCursorOptions {
  awareness: CursorAwareness;
  getSelection?: (state: EditorState) => Selection;
  createCursor?: (user: PeerID) => Element;
  createSelection?: (user: PeerID) => DecorationAttrs;
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
//#region src/loro/loro.d.ts
interface LoroOptions {
  /**
  * The Loro instance handles the state of shared data.
  */
  doc: LoroDocType;
  /**
  * The Awareness instance.
  */
  awareness: CursorAwareness;
  /**
  * Extra options for `LoroSyncPlugin`.
  */
  sync?: Omit<LoroSyncPluginProps$2, "doc">;
  /**
  * Extra options for the `LoroUndoPlugin`.
  */
  undo?: Omit<LoroUndoPluginProps$2, "doc">;
  /**
  * Extra options for `LoroCursorPlugin`.
  */
  cursor?: Omit<LoroCursorOptions, "awareness">;
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
export { LoroCursorOptions, LoroExtension, LoroOptions, LoroSyncPluginProps, LoroUndoPluginProps, defineLoro, defineLoroCommands, defineLoroCursorPlugin, defineLoroKeymap, defineLoroSyncPlugin, defineLoroUndoPlugin };