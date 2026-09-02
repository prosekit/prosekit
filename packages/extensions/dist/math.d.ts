import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
import { RenderMathBlock, RenderMathInline } from "prosemirror-math";
/**
 * @internal
 */
type MathBlockSpecExtension = Extension<{
  Nodes: {
    mathBlock: Attrs;
  };
}>;
/**
 * @internal
 */
export declare function defineMathBlockSpec(): MathBlockSpecExtension;
/**
 * Options for {@link defineMathBlockView}.
 *
 * @internal
 */
interface MathBlockViewOptions {
  /**
   * The function to render the math block.
   */
  render: RenderMathBlock;
}
/**
 * Defines an extension that renders a math block using a custom node view.
 *
 * @param options
 * @internal
 */
export declare function defineMathBlockView({ render }: MathBlockViewOptions): Extension;
/**
 * @internal
 */
export declare function defineMathBlockEnterRule(): PlainExtension;
/**
 * Options for {@link defineMathBlock}.
 *
 * @internal
 */
interface MathBlockOptions {
  /**
   * The function to render the math block.
   */
  render: RenderMathBlock;
}
/**
 * @internal
 */
type MathBlockExtension = Union<[MathBlockSpecExtension]>;
/**
 * Defines node `mathBlock` and related functionalities.
 *
 * @param options
 */
export declare function defineMathBlock(options: MathBlockOptions): MathBlockExtension;
/**
 * @internal
 */
type MathInlineSpecExtension = Extension<{
  Nodes: {
    mathInline: Attrs;
  };
}>;
/**
 * @internal
 */
export declare function defineMathInlineSpec(): MathInlineSpecExtension;
/**
 * Options for {@link defineMathInlineView}.
 *
 * @internal
 */
interface MathInlineViewOptions {
  /**
   * The function to render the math inline.
   */
  render: RenderMathInline;
}
/**
 * Defines an extension that renders a math inline using a custom node view.
 *
 * @param options
 * @internal
 */
export declare function defineMathInlineView({ render }: MathInlineViewOptions): Extension;
/**
 * @internal
 */
export declare function defineMathInlineInputRule(): PlainExtension;
/**
 * Options for {@link defineMathInline}.
 *
 * @internal
 */
interface MathInlineOptions {
  /**
   * The function to render the math inline.
   */
  render: RenderMathInline;
}
/**
 * @internal
 */
type MathInlineExtension = Union<[MathInlineSpecExtension]>;
/**
 * Defines node `mathInline` and related functionalities.
 *
 * @param options
 */
export declare function defineMathInline(options: MathInlineOptions): MathInlineExtension;
export declare function defineMathPlugin(): PlainExtension;
type MathExtension = Union<[MathInlineExtension, MathBlockExtension]>;
/**
 * Options for {@link defineMath}.
 */
interface MathOptions {
  /**
   * The function to render the math block.
   */
  renderMathBlock: RenderMathBlock;
  /**
   * The function to render the math inline.
   */
  renderMathInline: RenderMathInline;
}
export declare function defineMath(options: MathOptions): MathExtension;
export type { MathBlockExtension, MathBlockOptions, MathBlockSpecExtension, MathBlockViewOptions, MathExtension, MathInlineExtension, MathInlineOptions, MathInlineSpecExtension, MathInlineViewOptions, MathOptions };
//# sourceMappingURL=math.d.ts.map