import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Command } from "@prosekit/pm/state";
import { Attrs } from "@prosekit/pm/model";

//#region src/hard-break/hard-break-commands.d.ts
/**
 * @internal
 */
type HardBreakCommandsExtension = Extension<{
  Commands: {
    insertHardBreak: [];
  };
}>;
/**
 * @internal
 */

/**
 * @internal
 */
declare function defineHardBreakCommands(): HardBreakCommandsExtension;
//#endregion
//#region src/hard-break/hard-break-spec.d.ts
/**
 * @internal
 */
type HardBreakSpecExtension = Extension<{
  Nodes: {
    hardBreak: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineHardBreakSpec(): HardBreakSpecExtension;
//#endregion
//#region src/hard-break/hard-break.d.ts
/**
 * @internal
 */
type HardBreakExtension = Union<[HardBreakSpecExtension, HardBreakCommandsExtension]>;
/**
 * @public
 */
declare function defineHardBreak(): HardBreakExtension;
//#endregion
//#region src/hard-break/hard-break-keymap.d.ts
/**
 * @internal
 */
declare function defineHardBreakKeymap(): PlainExtension;
//#endregion
export { type HardBreakCommandsExtension, type HardBreakExtension, type HardBreakSpecExtension, defineHardBreak, defineHardBreakCommands, defineHardBreakKeymap, defineHardBreakSpec };
//# sourceMappingURL=prosekit-extensions-hard-break.d.ts.map