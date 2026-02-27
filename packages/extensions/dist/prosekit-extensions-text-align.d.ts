import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";

//#region src/text-align/index.d.ts
/**
 * @public
 */
interface TextAlignOptions<NodeName extends string = string> {
  /**
   * The names of node to add the attribute to.
   *
   * @example
   *
   * ["paragraph", "heading"]
   */
  types: NodeName[];
  /**
   * The default value for the attribute.
   *
   * @default "left"
   */
  default?: string;
}
/**
 * @internal
 */
type TextAlignAttrsExtension<NodeName extends string> = Extension<{
  Nodes: { [K in NodeName]: {
    textAlign: string | null;
  } };
}>;
/**
 * @internal
 */
declare function setTextAlign({
  types,
  value
}: {
  types: string[];
  value: string | null;
}): Command;
/**
 * @internal
 */
type TextAlignCommandsExtension = Extension<{
  Commands: {
    setTextAlign: [value: string | null];
  };
}>;
/**
 * @internal
 */
declare function defineTextAlignCommands(types: string[]): TextAlignCommandsExtension;
/**
 * @internal
 */
declare function defineTextAlignKeymap(types: string[]): PlainExtension;
/**
 * @internal
 */
type TextAlignExtension<NodeName extends string> = Union<[TextAlignAttrsExtension<NodeName>, TextAlignCommandsExtension]>;
/**
 * Adds a `textAlign` attribute to the specified nodes. This will be rendered as
 * a CSS `text-align` style.
 *
 * @public
 */
declare function defineTextAlign<NodeName extends string = string>(options: TextAlignOptions<NodeName>): TextAlignExtension<NodeName>;
//#endregion
export { TextAlignAttrsExtension, TextAlignCommandsExtension, TextAlignExtension, TextAlignOptions, defineTextAlign, defineTextAlignCommands, defineTextAlignKeymap, setTextAlign };
//# sourceMappingURL=prosekit-extensions-text-align.d.ts.map