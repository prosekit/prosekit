import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
export interface TextAlignOptions<NodeName extends string = string> {
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
export type TextAlignAttrsExtension<NodeName extends string> = Extension<{
  Nodes: { [K in NodeName]: {
    textAlign: string | null;
  }; };
}>;
/**
 * @internal
 */
export declare function setTextAlign({ types, value }: {
  types: string[];
  value: string | null;
}): Command;
/**
 * @internal
 */
export type TextAlignCommandsExtension = Extension<{
  Commands: {
    setTextAlign: [value: string | null];
  };
}>;
/**
 * @internal
 */
export declare function defineTextAlignCommands(types: string[]): TextAlignCommandsExtension;
/**
 * @internal
 */
export declare function defineTextAlignKeymap(types: string[]): PlainExtension;
/**
 * @internal
 */
export type TextAlignExtension<NodeName extends string> = Union<[TextAlignAttrsExtension<NodeName>, TextAlignCommandsExtension]>;
/**
 * Adds a `textAlign` attribute to the specified nodes. This will be rendered as
 * a CSS `text-align` style.
 */
export declare function defineTextAlign<NodeName extends string = string>(options: TextAlignOptions<NodeName>): TextAlignExtension<NodeName>;
//# sourceMappingURL=text-align.d.ts.map