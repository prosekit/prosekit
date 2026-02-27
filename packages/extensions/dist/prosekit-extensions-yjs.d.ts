import { Extension, PlainExtension, Union } from "@prosekit/core";
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from "y-prosemirror";
import * as Y from "yjs";

//#region src/yjs/yjs-commands.d.ts
/**
 * @internal
 */
type YjsCommandsExtension = Extension<{
  Commands: {
    undo: [];
    redo: [];
  };
}>;
declare function defineYjsCommands(): YjsCommandsExtension;
//#endregion
//#region src/yjs/yjs-types.d.ts
/**
 * @internal
 *
 * The type `Awareness` is not exported by `y-prosemirror` so we need to define it like this.
 */
type Awareness = Parameters<typeof yCursorPlugin>[0];
//#endregion
//#region src/yjs/yjs-cursor-plugin.d.ts
/**
 * Options for `y-prosemirror`'s `yCursorPlugin`.
 */
type YjsCursorPluginOptions = NonNullable<Parameters<typeof yCursorPlugin>[1]>;
interface YjsCursorOptions extends YjsCursorPluginOptions {
  awareness: Awareness;
}
declare function defineYjsCursorPlugin(options: YjsCursorOptions): PlainExtension;
//#endregion
//#region src/yjs/yjs-keymap.d.ts
declare function defineYjsKeymap(): PlainExtension;
//#endregion
//#region src/yjs/yjs-sync-plugin.d.ts
/**
 * Options for `y-prosemirror`'s `ySyncPlugin`.
 */
type YjsSyncPluginOptions = NonNullable<Parameters<typeof ySyncPlugin>[1]>;
interface YjsSyncOptions extends YjsSyncPluginOptions {
  fragment: Y.XmlFragment;
}
declare function defineYjsSyncPlugin(options: YjsSyncOptions): PlainExtension;
//#endregion
//#region src/yjs/yjs-undo-plugin.d.ts
/**
 * Options for the `y-prosemirror`'s `yUndoPlugin`.
 */
type YjsUndoPluginOptions = NonNullable<Parameters<typeof yUndoPlugin>[0]>;
interface YjsUndoOptions extends YjsUndoPluginOptions {}
/**
 * @internal
 */
declare function defineYjsUndoPlugin(options: YjsUndoOptions): PlainExtension;
//#endregion
//#region src/yjs/yjs.d.ts
interface YjsOptions {
  /**
   * The Yjs instance handles the state of shared data.
   */
  doc: Y.Doc;
  /**
   * The Awareness instance.
   */
  awareness: Awareness;
  /**
   * The Yjs XmlFragment to use. If not provided,
   * `doc.getXmlFragment('prosemirror')` will be used.
   */
  fragment?: Y.XmlFragment;
  /**
   * Options for `y-prosemirror`'s `ySyncPlugin`.
   */
  sync?: YjsSyncPluginOptions;
  /**
   * Options for the `y-prosemirror`'s `yUndoPlugin`.
   */
  undo?: YjsUndoPluginOptions;
  /**
   * Options for `y-prosemirror`'s `yCursorPlugin`.
   */
  cursor?: YjsCursorPluginOptions;
}
/**
 * @internal
 */
type YjsExtension = Union<[YjsCommandsExtension, PlainExtension]>;
/**
 * @public
 */
declare function defineYjs(options: YjsOptions): YjsExtension;
//#endregion
export { type Awareness, type YjsCursorOptions, type YjsCursorPluginOptions, type YjsExtension, type YjsOptions, type YjsSyncOptions, type YjsSyncPluginOptions, type YjsUndoOptions, type YjsUndoPluginOptions, defineYjs, defineYjsCommands, defineYjsCursorPlugin, defineYjsKeymap, defineYjsSyncPlugin, defineYjsUndoPlugin };
//# sourceMappingURL=prosekit-extensions-yjs.d.ts.map