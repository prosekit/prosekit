import { OBJECT_REPLACEMENT_CHARACTER, defineFacet, defineFacetPayload, getNodeType, isTextSelection, maybeRun, pluginFacet } from "@prosekit/core";
import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { keydownHandler } from "@prosekit/pm/keymap";

//#region src/enter-rule/index.ts
/**
* Defines an enter rule. An enter rule applies when the text directly in front of
* the cursor matches `regex` and user presses Enter. The `regex` should end
* with `$`.
*
* @param options
*
* @public
*/
function defineEnterRule({ regex, handler, stop = false }) {
	const rule = new EnterRule(regex, handler, stop);
	return defineFacetPayload(enterRule, [rule]);
}
/**
* Defines an enter rule that replaces the matched text with a block node.
*
* See also {@link defineEnterRule}.
*
* @param options
*
* @public
*/
function defineTextBlockEnterRule({ regex, type, attrs, stop = true }) {
	return defineEnterRule({
		regex,
		handler: ({ state, from, to, match }) => {
			const nodeType = getNodeType(state.schema, type);
			const $start = state.doc.resolve(from);
			if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) return null;
			const nodeAttrs = maybeRun(attrs, match);
			return state.tr.delete(from, to).setBlockType(from, from, nodeType, nodeAttrs);
		},
		stop
	});
}
/**
* @internal
*/
var EnterRule = class {
	constructor(regex, handler, stop) {
		this.regex = regex;
		this.handler = handler;
		this.stop = stop;
	}
};
const enterRule = defineFacet({
	reduce: () => {
		let rules = [];
		const command = (state, dispatch, view) => {
			if (!view) return false;
			return execRules(view, rules, dispatch);
		};
		const handler = keydownHandler({ Enter: command });
		const plugin = new ProseMirrorPlugin({
			key: new PluginKey("prosekit-enter-rule"),
			props: { handleKeyDown: handler }
		});
		return function reducer(inputs) {
			rules = inputs;
			return plugin;
		};
	},
	parent: pluginFacet
});
function execRules(view, rules, dispatch) {
	if (view.composing) return false;
	const state = view.state;
	const selection = state.selection;
	if (!isTextSelection(selection)) return false;
	const $cursor = selection.$cursor;
	if (!$cursor || $cursor.parent.type.spec.code) return false;
	const textBefore = $cursor.parent.textBetween(Math.max(0, $cursor.parentOffset - MAX_MATCH), $cursor.parentOffset, null, OBJECT_REPLACEMENT_CHARACTER);
	for (const rule of rules) {
		rule.regex.lastIndex = 0;
		const match = rule.regex.exec(textBefore);
		const tr = match && rule.handler({
			state,
			from: $cursor.pos - match[0].length,
			to: $cursor.pos,
			match
		});
		if (!tr) continue;
		dispatch?.(tr);
		if (rule.stop) return true;
	}
	return false;
}
const MAX_MATCH = 200;

//#endregion
export { defineEnterRule, defineTextBlockEnterRule };
//# sourceMappingURL=enter-rule-RdhEA900.js.map