import { Extension } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
export type TextExtension = Extension<{
  Nodes: {
    text: Attrs;
  };
}>;
export declare function defineText(): TextExtension;
//# sourceMappingURL=text.d.ts.map