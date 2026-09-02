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
export declare function defineHardBreakCommands(): HardBreakCommandsExtension;
/**
 * @internal
 */
export declare function defineHardBreakKeymap(): PlainExtension;
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
export declare function defineHardBreakSpec(): HardBreakSpecExtension;
/**
 * @internal
 */
type HardBreakExtension = Union<[HardBreakSpecExtension, HardBreakCommandsExtension]>;
export declare function defineHardBreak(): HardBreakExtension;
export type { HardBreakCommandsExtension, HardBreakExtension, HardBreakSpecExtension };
//# sourceMappingURL=hard-break.d.ts.map