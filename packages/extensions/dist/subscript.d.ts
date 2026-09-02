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
export declare function defineSubscriptCommands(): SubscriptCommandsExtension;
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
export declare function defineSubscriptSpec(): SubscriptSpecExtension;
/**
 * @internal
 */
type SubscriptExtension = Union<[SubscriptSpecExtension, SubscriptCommandsExtension]>;
export declare function defineSubscript(): SubscriptExtension;
export type { SubscriptCommandsExtension, SubscriptExtension, SubscriptSpecExtension };
//# sourceMappingURL=subscript.d.ts.map