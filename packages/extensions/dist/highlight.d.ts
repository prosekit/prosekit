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
export declare function defineHighlightCommands(): HighlightCommandsExtension;
/**
 * @internal
 */
export declare function defineHighlightInputRule(): PlainExtension;
/**
 * @internal
 */
export declare function defineHighlightKeymap(): PlainExtension;
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
export declare function defineHighlightSpec(): HighlightSpecExtension;
/**
 * @internal
 */
type HighlightExtension = Union<[HighlightSpecExtension, HighlightCommandsExtension]>;
export declare function defineHighlight(): HighlightExtension;
export type { HighlightCommandsExtension, HighlightExtension, HighlightSpecExtension };
//# sourceMappingURL=highlight.d.ts.map