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
declare function defineCodeCommands(): CodeCommandsExtension;
/**
 * @internal
 */
declare function defineCodeInputRule(): PlainExtension;
/**
 * @internal
 */
declare function defineCodeKeymap(): PlainExtension;
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
declare function defineCodeSpec(): CodeSpecExtension;
/**
 * @internal
 */
type CodeExtension = Union<[CodeSpecExtension, CodeCommandsExtension]>;
declare function defineCode(): CodeExtension;
export { type CodeCommandsExtension, type CodeExtension, type CodeSpecExtension, defineCode, defineCodeCommands, defineCodeInputRule, defineCodeKeymap, defineCodeSpec };
//# sourceMappingURL=code.d.ts.map