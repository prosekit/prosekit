import { Extension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type SubscriptCommandsExtension = Extension<{
  Commands: {
    toggleSubscript: [];
  };
}>;
/**
 * @internal
 */
declare function defineSubscriptCommands(): SubscriptCommandsExtension;
/**
 * @internal
 */
type SubscriptSpecExtension = Extension<{
  Marks: {
    subscript: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineSubscriptSpec(): SubscriptSpecExtension;
/**
 * @internal
 */
type SubscriptExtension = Union<[SubscriptSpecExtension, SubscriptCommandsExtension]>;
declare function defineSubscript(): SubscriptExtension;
export { type SubscriptCommandsExtension, type SubscriptExtension, type SubscriptSpecExtension, defineSubscript, defineSubscriptCommands, defineSubscriptSpec };
//# sourceMappingURL=subscript.d.ts.map