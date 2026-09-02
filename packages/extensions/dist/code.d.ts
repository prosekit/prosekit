import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type CodeCommandsExtension = Extension<{
  Commands: {
    toggleCode: [];
  };
}>;
/**
 * @internal
 */
export declare function defineCodeCommands(): CodeCommandsExtension;
/**
 * @internal
 */
export declare function defineCodeInputRule(): PlainExtension;
/**
 * @internal
 */
export declare function defineCodeKeymap(): PlainExtension;
/**
 * @internal
 */
type CodeSpecExtension = Extension<{
  Marks: {
    code: Attrs;
  };
}>;
/**
 * @internal
 */
export declare function defineCodeSpec(): CodeSpecExtension;
/**
 * @internal
 */
type CodeExtension = Union<[CodeSpecExtension, CodeCommandsExtension]>;
export declare function defineCode(): CodeExtension;
export type { CodeCommandsExtension, CodeExtension, CodeSpecExtension };
//# sourceMappingURL=code.d.ts.map