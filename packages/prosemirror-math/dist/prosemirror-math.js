import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { createTextBlockEnterRule } from "prosemirror-enter-rules";
import { supportsRegexLookbehind } from "@ocavue/utils";
import { InputRule } from "prosemirror-inputrules";

//#region src/cursor-inside-plugin.ts
const DECORATION_SPEC = "MATH_CURSOR_INSIDE";
function createCursorInsideDecoration(state) {
	const { $head } = state.selection;
	const node = $head.parent;
	if (!node.type.isInGroup("math")) return;
	const before = $head.before();
	const deco = Decoration.node(before, before + node.nodeSize, { class: "prosemirror-math-head-inside" }, DECORATION_SPEC);
	return DecorationSet.create(state.doc, [deco]);
}
/**
* @internal
*/
function hasCursorInsideDecoration(decorations) {
	return decorations.some((deco) => deco.spec === DECORATION_SPEC);
}
/**
* Creates a plugin that adds a `prosemirror-math-head-inside` CSS class to math
* nodes when the text selection head is inside them. This is useful for styling
* math nodes differently while they are being edited.
*
* The plugin automatically detects nodes in the `math` group.
*
* @public
*/
function createCursorInsidePlugin() {
	const key = new PluginKey("prosemirror-math-cursor-inside");
	return new Plugin({
		key,
		state: {
			init() {},
			apply(tr, oldValue, oldState, newState) {
				if (oldState.selection.head === newState.selection.head && !tr.docChanged) return oldValue;
				return createCursorInsideDecoration(newState);
			}
		},
		props: { decorations(state) {
			return key.getState(state);
		} }
	});
}

//#endregion
//#region src/math-block-enter-rule.ts
const MATH_BLOCK_ENTER_REGEXP = /^\$\$$/;
const mathBlockEnterRule = /* @__PURE__ */ createTextBlockEnterRule({
	regex: MATH_BLOCK_ENTER_REGEXP,
	type: "mathBlock"
});

//#endregion
//#region src/math-block-spec.ts
const mathBlockSpec = {
	atom: false,
	group: "block math",
	content: "text*",
	code: true,
	toDOM() {
		return [
			"div",
			{ class: "prosekit-math-block" },
			["pre", ["code", 0]]
		];
	},
	parseDOM: [{
		tag: "div.prosekit-math-block",
		contentElement: "code"
	}]
};

//#endregion
//#region src/create-element.ts
function createElement(tag, className, ...children) {
	const element = document.createElement(tag);
	if (className) element.className = className;
	if (children.length > 0) element.append(...children);
	return element;
}

//#endregion
//#region src/math-view-render.ts
function createMathViewRender(renderMath, source, display) {
	let prevNode;
	let prevText;
	let prevSelected;
	function updateDisplay(node) {
		if (node === prevNode) return;
		prevNode = node;
		const text = node.textContent;
		if (text === prevText) return;
		prevText = text;
		renderMath(text, display);
	}
	function updateStyle(decorations) {
		const selected = hasCursorInsideDecoration(decorations);
		if (selected === prevSelected) return;
		prevSelected = selected;
		source.style.display = selected ? "" : "none";
		display.style.display = selected ? "none" : "";
	}
	return function updateMathView(node, decorations) {
		updateDisplay(node);
		updateStyle(decorations);
	};
}

//#endregion
//#region src/math-block-view.ts
function createMathBlockView(renderMathBlock, node, decorations) {
	const code = createElement("code");
	const source = createElement("pre", "prosekit-math-source", code);
	const display = createElement("div", "prosekit-math-display");
	const dom = createElement("div", "prosekit-math-block", source, display);
	const render = createMathViewRender(renderMathBlock, source, display);
	render(node, decorations);
	return {
		dom,
		contentDOM: code,
		update: (node, decorations) => {
			render(node, decorations);
			return true;
		}
	};
}

//#endregion
//#region src/math-inline-input-rule.ts
const MATH_INPUT_REGEXP = (supportsRegexLookbehind() ? "(?<!\\$)" : "") + "(\\$\\$?)([^\\s$](?:[^$]*[^\\s$])?)\\1$";
function createMathInlineInputRule(nodeType) {
	return new InputRule(new RegExp(MATH_INPUT_REGEXP), (state, match, start, end) => {
		const { tr, schema } = state;
		const mathText = match[2];
		if (!mathText) return null;
		const type = schema.nodes[nodeType];
		if (!type) return null;
		const node = type.create(null, schema.text(mathText));
		tr.replaceWith(start, end, node);
		return tr;
	});
}

//#endregion
//#region src/math-inline-spec.ts
const mathInlineSpec = {
	atom: false,
	inline: true,
	group: "inline math",
	content: "text*",
	selectable: false,
	code: true,
	toDOM() {
		return [
			"span",
			{ class: "prosekit-math-inline" },
			["code", 0]
		];
	},
	parseDOM: [{
		tag: "span.prosekit-math-inline",
		contentElement: "code"
	}]
};

//#endregion
//#region src/math-inline-view.ts
function createMathInlineView(renderMathInline, node, decorations) {
	const source = createElement("code", "prosekit-math-source");
	const display = createElement("span", "prosekit-math-display");
	const dom = createElement("span", "prosekit-math-inline", source, display);
	const render = createMathViewRender(renderMathInline, source, display);
	render(node, decorations);
	return {
		dom,
		contentDOM: source,
		update: (node, decorations) => {
			render(node, decorations);
			return true;
		}
	};
}

//#endregion
export { createCursorInsidePlugin, createMathBlockView, createMathInlineInputRule, createMathInlineView, mathBlockEnterRule, mathBlockSpec, mathInlineSpec };