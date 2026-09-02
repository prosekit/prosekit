import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type PageBreakCommandsExtension = Extension<{
  Commands: {
    insertPageBreak: [];
  };
}>;
/**
 * @internal
 */
declare function insertPageBreak(): Command;
/**
 * @internal
 */
declare function definePageBreakCommands(): PageBreakCommandsExtension;
/**
 * @internal
 */
type PageBreakKeymapExtension = PlainExtension;
/**
 * @internal
 */
declare function definePageBreakKeymap(): PageBreakKeymapExtension;
/**
 * @internal
 */
type PageBreakSpecExtension = Extension<{
  Nodes: {
    pageBreak: Attrs;
  };
}>;
/**
 * @internal
 */
declare function definePageBreakSpec(): PageBreakSpecExtension;
declare module '@prosekit/pm/model' {
  interface NodeSpec {
    pageBreak?: boolean | undefined;
  }
}
/**
 * @internal
 */
type PageBreakExtension = Union<[PageBreakSpecExtension, PageBreakCommandsExtension, PageBreakKeymapExtension]>;
declare function definePageBreak(): PageBreakExtension;
interface PageRenderingOptions {
  /**
   * The width of the page in px.
   *
   * @default 794 (Portrait A4 paper size in 96 DPI)
   */
  pageWidth?: number;
  /**
   * The height of the page in px.
   *
   * @default 1123 (Portrait A4 paper size in 96 DPI)
   */
  pageHeight?: number;
  /**
   * The top margin of the page in px.
   *
   * @default 70
   */
  marginTop?: number;
  /**
   * The right margin of the page in px.
   *
   * @default 70
   */
  marginRight?: number;
  /**
   * The bottom margin of the page in px.
   *
   * @default 70
   */
  marginBottom?: number;
  /**
   * The left margin of the page in px.
   *
   * @default 70
   */
  marginLeft?: number;
}
declare function definePageRendering(options?: PageRenderingOptions): PageRenderingExtension;
/**
 * @internal
 */
type PageRenderingExtension = Extension;
export { type PageBreakCommandsExtension, type PageBreakExtension, type PageBreakKeymapExtension, type PageBreakSpecExtension, type PageRenderingExtension, type PageRenderingOptions, definePageBreak, definePageBreakCommands, definePageBreakKeymap, definePageBreakSpec, definePageRendering, insertPageBreak };
//# sourceMappingURL=page.d.ts.map