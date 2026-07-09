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
declare function defineDoc(): DocExtension;
export { DocExtension, defineDoc };
//# sourceMappingURL=doc.d.ts.map