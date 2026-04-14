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
/**
 * @public
 */
declare function defineText(): TextExtension;
export { TextExtension, defineText };
//# sourceMappingURL=prosekit-extensions-text.d.ts.map