import { Plugin } from "prosemirror-state";
import { Decoration, NodeView } from "prosemirror-view";
import { EnterRule } from "prosemirror-enter-rules";
import { InputRule } from "prosemirror-inputrules";
import { Node, NodeSpec } from "prosemirror-model";

//#region src/cursor-inside-plugin.d.ts
/**
 * Creates a plugin that adds a `prosemirror-math-head-inside` CSS class to math
 * nodes when the text selection head is inside them. This is useful for styling
 * math nodes differently while they are being edited.
 *
 * The plugin automatically detects nodes in the `math` group.
 *
 * @public
 */
declare function createCursorInsidePlugin(): Plugin;
//#endregion
//#region src/math-block-enter-rule.d.ts
declare const mathBlockEnterRule: EnterRule;
//#endregion
//#region src/math-block-spec.d.ts
declare const mathBlockSpec: NodeSpec;
//#endregion
//#region src/math-block-view.d.ts
/**
 * The function to render a math block.
 *
 * @param text - The text of the math block. For example, a TeX expression.
 * @param element - A `<div>` element to render the math block.
 */
type RenderMathBlock = (text: string, element: HTMLElement) => void;
declare function createMathBlockView(renderMathBlock: RenderMathBlock, node: Node, decorations: readonly Decoration[]): NodeView;
//#endregion
//#region src/math-inline-input-rule.d.ts
declare function createMathInlineInputRule(nodeType: string): InputRule;
//#endregion
//#region src/math-inline-spec.d.ts
declare const mathInlineSpec: NodeSpec;
//#endregion
//#region src/math-inline-view.d.ts
/**
 * The function to render a math inline.
 *
 * @param text - The text of the math inline. For example, a TeX expression.
 * @param element - A `<span>` element to render the math inline.
 */
type RenderMathInline = (text: string, element: HTMLElement) => void;
declare function createMathInlineView(renderMathInline: RenderMathInline, node: Node, decorations: readonly Decoration[]): NodeView;
//#endregion
export { type RenderMathBlock, type RenderMathInline, createCursorInsidePlugin, createMathBlockView, createMathInlineInputRule, createMathInlineView, mathBlockEnterRule, mathBlockSpec, mathInlineSpec };