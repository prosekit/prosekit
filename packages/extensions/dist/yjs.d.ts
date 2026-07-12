import { Extension, PlainExtension, Union } from "@prosekit/core";
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from "y-prosemirror";
import * as Y from "yjs";
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
/**
 * @internal
 *
 * The type `Awareness` is not exported by `y-prosemirror` so we need to define it like this.
 */
type Awareness = Parameters<typeof yCursorPlugin>[0];
/**
 * Options for `y-prosemirror`'s `yCursorPlugin`.
 */
type YjsCursorPluginOptions = NonNullable<Parameters<typeof yCursorPlugin>[1]>;
interface YjsCursorOptions extends YjsCursorPluginOptions {
  awareness: Awareness;
}
declare function defineYjsCursorPlugin(options: YjsCursorOptions): PlainExtension;
declare function defineYjsKeymap(): PlainExtension;
/**
 * Options for `y-prosemirror`'s `ySyncPlugin`.
 */
type YjsSyncPluginOptions = NonNullable<Parameters<typeof ySyncPlugin>[1]>;
interface YjsSyncOptions extends YjsSyncPluginOptions {
  fragment: Y.XmlFragment;
}
declare function defineYjsSyncPlugin(options: YjsSyncOptions): PlainExtension;
/**
 * Options for the `y-prosemirror`'s `yUndoPlugin`.
 */
type YjsUndoPluginOptions = NonNullable<Parameters<typeof yUndoPlugin>[0]>;
interface YjsUndoOptions extends YjsUndoPluginOptions {}
/**
 * @internal
 */
declare function defineYjsUndoPlugin(options: YjsUndoOptions): PlainExtension;
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
declare function defineYjs(options: YjsOptions): YjsExtension;
export { type Awareness, type YjsCursorOptions, type YjsCursorPluginOptions, type YjsExtension, type YjsOptions, type YjsSyncOptions, type YjsSyncPluginOptions, type YjsUndoOptions, type YjsUndoPluginOptions, defineYjs, defineYjsCommands, defineYjsCursorPlugin, defineYjsKeymap, defineYjsSyncPlugin, defineYjsUndoPlugin };
//# sourceMappingURL=yjs.d.ts.map