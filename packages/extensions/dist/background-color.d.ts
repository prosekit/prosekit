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
declare function defineBackgroundColorSpec(): BackgroundColorSpecExtension;
/**
 * @internal
 */
declare function addBackgroundColor(attrs: BackgroundColorAttrs): Command;
/**
 * @internal
 */
declare function removeBackgroundColor(): Command;
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
declare function defineBackgroundColorCommands(): BackgroundColorCommandsExtension;
/**
 * @internal
 */
type BackgroundColorExtension = Union<[BackgroundColorSpecExtension, BackgroundColorCommandsExtension]>;
/**
 * Defines the `backgroundColor` mark and some commands for it.
 */
declare function defineBackgroundColor(): BackgroundColorExtension;
export { type BackgroundColorAttrs, type BackgroundColorCommandsExtension, type BackgroundColorExtension, type BackgroundColorSpecExtension, addBackgroundColor, defineBackgroundColor, defineBackgroundColorCommands, defineBackgroundColorSpec, removeBackgroundColor };
//# sourceMappingURL=background-color.d.ts.map