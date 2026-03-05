import { defineInputRule } from "./prosekit-extensions-input-rule.js";
import { defineEnterRule } from "./prosekit-extensions-enter-rule.js";
import { defineNodeSpec, defineNodeView, definePlugin, union } from "@prosekit/core";
import { createCursorInsidePlugin, createMathBlockView, createMathInlineInputRule, createMathInlineView, mathBlockEnterRule, mathBlockSpec, mathInlineSpec } from "prosemirror-math";

//#region src/math/math-block.ts
/**
* @internal
*/
function defineMathBlockSpec() {
	return defineNodeSpec({
		...mathBlockSpec,
		attrs: { language: {
			default: "tex",
			validate: "string"
		} },
		name: "mathBlock"
	});
}
/**
* Defines an extension that renders a math block using a custom node view.
*
* @param options
* @internal
*/
function defineMathBlockView({ render }) {
	return defineNodeView({
		name: "mathBlock",
		constructor: (node, view, getPos, decorations) => {
			return createMathBlockView(render, node, decorations);
		}
	});
}
/**
* @internal
*/
function defineMathBlockEnterRule() {
	return defineEnterRule(mathBlockEnterRule);
}
/**
* Defines node `mathBlock` and related functionalities.
*
* @param options
* @public
*/
function defineMathBlock(options) {
	return union(defineMathBlockSpec(), defineMathBlockView(options), defineMathBlockEnterRule());
}

//#endregion
//#region src/math/math-inline.ts
/**
* @internal
*/
function defineMathInlineSpec() {
	return defineNodeSpec({
		...mathInlineSpec,
		name: "mathInline"
	});
}
/**
* Defines an extension that renders a math inline using a custom node view.
*
* @param options
* @internal
*/
function defineMathInlineView({ render }) {
	return defineNodeView({
		name: "mathInline",
		constructor: (node, view, getPos, decorations) => {
			return createMathInlineView(render, node, decorations);
		}
	});
}
/**
* @internal
*/
function defineMathInlineInputRule() {
	return defineInputRule(createMathInlineInputRule("mathInline"));
}
/**
* Defines node `mathInline` and related functionalities.
*
* @param options
* @public
*/
function defineMathInline(options) {
	return union(defineMathInlineSpec(), defineMathInlineView(options), defineMathInlineInputRule());
}

//#endregion
//#region src/math/math-plugin.ts
function defineMathPlugin() {
	return definePlugin(createCursorInsidePlugin());
}

//#endregion
//#region src/math/math.ts
/**
* @public
*/
function defineMath(options) {
	return union(defineMathBlock({ render: options.renderMathBlock }), defineMathInline({ render: options.renderMathInline }), defineMathPlugin());
}

//#endregion
export { defineMath, defineMathBlock, defineMathBlockEnterRule, defineMathBlockSpec, defineMathBlockView, defineMathInline, defineMathInlineInputRule, defineMathInlineSpec, defineMathInlineView, defineMathPlugin };
//# sourceMappingURL=prosekit-extensions-math.js.map