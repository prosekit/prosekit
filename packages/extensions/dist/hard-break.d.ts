import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
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
declare function defineHardBreakCommands(): HardBreakCommandsExtension;
/**
 * @internal
 */
declare function defineHardBreakKeymap(): PlainExtension;
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
/**
 * @internal
 */
type HardBreakExtension = Union<[HardBreakSpecExtension, HardBreakCommandsExtension]>;
declare function defineHardBreak(): HardBreakExtension;
export { type HardBreakCommandsExtension, type HardBreakExtension, type HardBreakSpecExtension, defineHardBreak, defineHardBreakCommands, defineHardBreakKeymap, defineHardBreakSpec };
//# sourceMappingURL=hard-break.d.ts.map