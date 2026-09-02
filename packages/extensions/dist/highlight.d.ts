import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type HighlightCommandsExtension = Extension<{
  Commands: {
    toggleHighlight: [];
  };
}>;
/**
 * @internal
 */
declare function defineHighlightCommands(): HighlightCommandsExtension;
/**
 * @internal
 */
declare function defineHighlightInputRule(): PlainExtension;
/**
 * @internal
 */
declare function defineHighlightKeymap(): PlainExtension;
/**
 * @internal
 */
type HighlightSpecExtension = Extension<{
  Marks: {
    highlight: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineHighlightSpec(): HighlightSpecExtension;
/**
 * @internal
 */
type HighlightExtension = Union<[HighlightSpecExtension, HighlightCommandsExtension]>;
declare function defineHighlight(): HighlightExtension;
export { type HighlightCommandsExtension, type HighlightExtension, type HighlightSpecExtension, defineHighlight, defineHighlightCommands, defineHighlightInputRule, defineHighlightKeymap, defineHighlightSpec };
//# sourceMappingURL=highlight.d.ts.map