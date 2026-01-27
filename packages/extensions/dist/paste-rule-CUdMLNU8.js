import { defineFacet, defineFacetPayload, getMarkType, pluginFacet } from "@prosekit/core";
import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { Fragment, Slice } from "@prosekit/pm/model";

//#region src/paste-rule/paste-rule-plugin.ts
/**
* @internal
*/
const pasteRuleFacet = defineFacet({
	reduce: () => {
		let handlers = [];
		const transformPasted = (slice, view, plain) => {
			for (const handler of handlers) slice = handler({
				slice,
				view,
				plain
			});
			return slice;
		};
		const plugin = new ProseMirrorPlugin({
			key: new PluginKey("prosekit-paste-rule"),
			props: { transformPasted }
		});
		return (inputs) => {
			handlers = [...inputs].reverse();
			return plugin;
		};
	},
	singleton: true,
	parent: pluginFacet
});
/**
* @internal
*/
function definePasteRulePlugin(payload) {
	return defineFacetPayload(pasteRuleFacet, [payload]);
}

//#endregion
//#region src/paste-rule/paste-rule.ts
/**
* Defines a paste rule. This rule allows you to modify pasted or dragged
* content before it is inserted into the document.
*
* @param options
*
* @public
*/
function definePasteRule({ handler }) {
	return definePasteRulePlugin(handler);
}

//#endregion
//#region src/paste-rule/split-text-by-regex.ts
/**
* Splits text into chunks based on regex matches, preserving both matched and unmatched segments.
* Returns an array of tuples where each tuple contains a text segment and either the match data
* (for matched segments) or undefined (for unmatched segments).
*/
function splitTextByRegex(text, regex) {
	regex.lastIndex = 0;
	const chunks = [];
	let lastIndex = 0;
	let match;
	let matched = false;
	while (match = regex.exec(text)) {
		const start = match.index;
		const end = regex.lastIndex;
		if (start > lastIndex) chunks.push([text.slice(lastIndex, start), void 0]);
		chunks.push([text.slice(start, end), match]);
		matched = true;
		if (lastIndex === end) return;
		lastIndex = end;
	}
	if (matched && lastIndex < text.length) chunks.push([text.slice(lastIndex), void 0]);
	regex.lastIndex = 0;
	return matched ? chunks : void 0;
}

//#endregion
//#region src/paste-rule/mark-paste-rule.ts
/**
* Defines a paste rule that applies marks based on regex patterns.
*
* @public
*/
function defineMarkPasteRule(options) {
	return definePasteRule({ handler: ({ slice, view, plain }) => {
		if (plain) return slice;
		return replaceMarkInSlice({
			markType: getMarkType(view.state.schema, options.type),
			regex: options.regex,
			getAttrs: options.getAttrs,
			shouldSkip: options.shouldSkip
		}, slice);
	} });
}
function replaceMarkInSlice(options, slice) {
	const newFragment = replaceMarkInFragment(options, slice.content);
	if (!newFragment) return slice;
	return new Slice(newFragment, slice.openStart, slice.openEnd);
}
function replaceMarkInFragment(options, fragment) {
	let changed = false;
	let children = [];
	for (const child of fragment.content) {
		const newChild = replaceMarkInNode(options, child);
		if (newChild) changed = true;
		children.push(newChild || child);
	}
	if (changed) return Fragment.from(children);
}
function replaceMarkInNode(options, node) {
	if (node.type.spec.code) return;
	if (node.type.isInline) return;
	if (node.type.isTextblock) return replaceMarkInTextblockNode(options, node);
	const newChildren = replaceMarkInFragment(options, node.content);
	if (!newChildren) return;
	return node.copy(newChildren);
}
function replaceMarkInTextblockNode(options, node) {
	const newChildren = [];
	let changed = false;
	for (const inlineNode of node.content.content) {
		const newInlineNodes = replaceMarkInInlineNode(options, inlineNode);
		if (newInlineNodes) {
			changed = true;
			newChildren.push(...newInlineNodes);
		} else newChildren.push(inlineNode);
	}
	if (changed) return node.copy(Fragment.from(newChildren));
}
function replaceMarkInInlineNode(options, node) {
	const text = node.text;
	if (!text) return;
	const { markType, shouldSkip } = options;
	if (shouldSkip) {
		if (shouldSkip(node)) return;
	} else {
		if (node.marks.some((mark) => mark.type === markType)) return;
		if (node.marks.some((mark) => mark.type.spec.code)) return;
	}
	const chunks = splitTextByRegex(text, options.regex);
	if (!chunks) return;
	const schema = node.type.schema;
	const nodes = [];
	for (const [text$1, match] of chunks) {
		if (!text$1) continue;
		if (match) {
			const attrs = options.getAttrs?.(match) ?? null;
			if (attrs !== false) {
				const mark = markType.create(attrs);
				nodes.push(schema.text(text$1, [...node.marks, mark]));
			} else nodes.push(schema.text(text$1, node.marks));
		} else nodes.push(schema.text(text$1, node.marks));
	}
	return nodes;
}

//#endregion
export { definePasteRule as n, defineMarkPasteRule as t };
//# sourceMappingURL=paste-rule-CUdMLNU8.js.map