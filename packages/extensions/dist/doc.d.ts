import { Extension } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
export type DocExtension = Extension<{
  Nodes: {
    doc: Attrs;
  };
}>;
export declare function defineDoc(): DocExtension;
//# sourceMappingURL=doc.d.ts.map