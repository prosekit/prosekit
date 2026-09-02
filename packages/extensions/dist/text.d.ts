import { Extension } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type TextExtension = Extension<{
  Nodes: {
    text: Attrs;
  };
}>;
declare function defineText(): TextExtension;
export { TextExtension, defineText };
//# sourceMappingURL=text.d.ts.map