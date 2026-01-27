import { Extension, PlainExtension, Union } from "@prosekit/core";
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from "y-prosemirror";
import * as Y from "yjs";

//#region ../../node_modules/.pnpm/lib0@0.2.114/node_modules/lib0/observable.d.ts
/**
 * Handles named events.
 *
 * @deprecated
 * @template N
 */
declare class Observable<N> {
  /**
   * Some desc.
   * @type {Map<N, any>}
   */
  _observers: Map<N, any>;
  /**
   * @param {N} name
   * @param {function} f
   */
  on(name: N, f: Function): void;
  /**
   * @param {N} name
   * @param {function} f
   */
  once(name: N, f: Function): void;
  /**
   * @param {N} name
   * @param {function} f
   */
  off(name: N, f: Function): void;
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(name: N, args: Array<any>): void;
  destroy(): void;
}
//#endregion
//#region ../../node_modules/.pnpm/y-protocols@1.0.7_yjs@13.6.29/node_modules/y-protocols/awareness.d.ts
/**
 * @typedef {Object} MetaClientState
 * @property {number} MetaClientState.clock
 * @property {number} MetaClientState.lastUpdated unix timestamp
 */
/**
 * The Awareness class implements a simple shared state protocol that can be used for non-persistent data like awareness information
 * (cursor, username, status, ..). Each client can update its own local state and listen to state changes of
 * remote clients. Every client may set a state of a remote peer to `null` to mark the client as offline.
 *
 * Each client is identified by a unique client id (something we borrow from `doc.clientID`). A client can override
 * its own state by propagating a message with an increasing timestamp (`clock`). If such a message is received, it is
 * applied if the known state of that client is older than the new state (`clock < newClock`). If a client thinks that
 * a remote client is offline, it may propagate a message with
 * `{ clock: currentClientClock, state: null, client: remoteClient }`. If such a
 * message is received, and the known clock of that client equals the received clock, it will override the state with `null`.
 *
 * Before a client disconnects, it should propagate a `null` state with an updated clock.
 *
 * Awareness states must be updated every 30 seconds. Otherwise the Awareness instance will delete the client state.
 *
 * @extends {Observable<string>}
 */
declare class Awareness extends Observable<string> {
  /**
   * @param {Y.Doc} doc
   */
  constructor(doc: Y.Doc);
  doc: Y.Doc;
  /**
   * @type {number}
   */
  clientID: number;
  /**
   * Maps from client id to client state
   * @type {Map<number, Object<string, any>>}
   */
  states: Map<number, {
    [x: string]: any;
  }>;
  /**
   * @type {Map<number, MetaClientState>}
   */
  meta: Map<number, MetaClientState>;
  _checkInterval: any;
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState(): {
    [x: string]: any;
  } | null;
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(state: {
    [x: string]: any;
  } | null): void;
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(field: string, value: any): void;
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates(): Map<number, {
    [x: string]: any;
  }>;
}
type MetaClientState = {
  clock: number;
  /**
   * unix timestamp
   */
  lastUpdated: number;
};
//#endregion
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
//#region src/yjs/yjs-keymap.d.ts
declare function defineYjsKeymap(): PlainExtension;
//#endregion
export { type YjsCursorOptions, type YjsCursorPluginOptions, type YjsExtension, type YjsOptions, type YjsSyncOptions, type YjsSyncPluginOptions, type YjsUndoOptions, type YjsUndoPluginOptions, defineYjs, defineYjsCommands, defineYjsCursorPlugin, defineYjsKeymap, defineYjsSyncPlugin, defineYjsUndoPlugin };
//# sourceMappingURL=prosekit-extensions-yjs.d.ts.map