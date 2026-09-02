import { Command } from "@prosekit/pm/state";
import { Extension, Union } from "@prosekit/core";
/**
 * Attributes for the `backgroundColor` mark.
 */
interface BackgroundColorAttrs {
  color: string;
}
/**
 * @internal
 */
type BackgroundColorSpecExtension = Extension<{
  Marks: {
    backgroundColor: BackgroundColorAttrs;
  };
}>;
/**
 * @internal
 */
export declare function defineBackgroundColorSpec(): BackgroundColorSpecExtension;
/**
 * @internal
 */
export declare function addBackgroundColor(attrs: BackgroundColorAttrs): Command;
/**
 * @internal
 */
export declare function removeBackgroundColor(): Command;
/**
 * @internal
 */
type BackgroundColorCommandsExtension = Extension<{
  Commands: {
    addBackgroundColor: [attrs: BackgroundColorAttrs];
    removeBackgroundColor: [];
  };
}>;
/**
 * @internal
 */
export declare function defineBackgroundColorCommands(): BackgroundColorCommandsExtension;
/**
 * @internal
 */
type BackgroundColorExtension = Union<[BackgroundColorSpecExtension, BackgroundColorCommandsExtension]>;
/**
 * Defines the `backgroundColor` mark and some commands for it.
 */
export declare function defineBackgroundColor(): BackgroundColorExtension;
export type { BackgroundColorAttrs, BackgroundColorCommandsExtension, BackgroundColorExtension, BackgroundColorSpecExtension };
//# sourceMappingURL=background-color.d.ts.map