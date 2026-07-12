import { VirtualElement } from "@floating-ui/dom";
/**
 * A reference for an overlay to position against. This can be a DOM element, a
 * Floating UI virtual element, or a function that returns either of them.
 */
type AnchorReference = Element | VirtualElement | (() => Element | VirtualElement | null | undefined) | null;
export { AnchorReference as t };
//# sourceMappingURL=resolve-anchor.d.ts.map