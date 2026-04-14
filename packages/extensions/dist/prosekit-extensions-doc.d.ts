import { Extension } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type DocExtension = Extension<{
  Nodes: {
    doc: Attrs;
  };
}>;
/**
 * @public
 */
declare function defineDoc(): DocExtension;
export { DocExtension, defineDoc };
//# sourceMappingURL=prosekit-extensions-doc.d.ts.map