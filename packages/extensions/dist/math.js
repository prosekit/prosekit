import { defineInputRule } from "./input-rule.js";
import { defineEnterRule } from "./enter-rule.js";
import { defineNodeSpec, defineNodeView, definePlugin, union } from "@prosekit/core";
import { createCursorInsidePlugin, createMathBlockView, createMathInlineInputRule, createMathInlineView, mathBlockEnterRule, mathBlockSpec, mathInlineSpec } from "prosemirror-math";
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
*/
function defineMathBlock(options) {
	return union(defineMathBlockSpec(), defineMathBlockView(options), defineMathBlockEnterRule());
}
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
*/
function defineMathInline(options) {
	return union(defineMathInlineSpec(), defineMathInlineView(options), defineMathInlineInputRule());
}
function defineMathPlugin() {
	return definePlugin(createCursorInsidePlugin());
}
function defineMath(options) {
	return union(defineMathBlock({ render: options.renderMathBlock }), defineMathInline({ render: options.renderMathInline }), defineMathPlugin());
}
export { defineMath, defineMathBlock, defineMathBlockEnterRule, defineMathBlockSpec, defineMathBlockView, defineMathInline, defineMathInlineInputRule, defineMathInlineSpec, defineMathInlineView, defineMathPlugin };

//# sourceMappingURL=math.js.map