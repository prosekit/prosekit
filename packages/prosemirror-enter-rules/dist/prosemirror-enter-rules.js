import { keydownHandler } from "prosemirror-keymap";
import { Plugin, PluginKey, TextSelection } from "prosemirror-state";

//#region src/enter-rule.ts
/**
* Creates an enter rule that replaces the matched text with a block node.
*
* @public
*/
function createTextBlockEnterRule({ regex, type, attrs, stop = true }) {
	const handler = ({ state, from, to, match }) => {
		const nodeType = resolveNodeType(state.schema, type);
		const $start = state.doc.resolve(from);
		if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) return null;
		let nodeAttrs = null;
		if (attrs) {
			if (typeof attrs === "object") nodeAttrs = attrs;
			else if (typeof attrs === "function") nodeAttrs = attrs(match);
		}
		return state.tr.delete(from, to).setBlockType(from, from, nodeType, nodeAttrs);
	};
	return {
		regex,
		handler,
		stop
	};
}
function resolveNodeType(schema, type) {
	if (typeof type === "string") {
		const nodeType = schema.nodes[type];
		if (!nodeType) throw new Error(`Unknown node type "${type}"`);
		return nodeType;
	}
	return type;
}
/**
* Creates a ProseMirror command that handles enter rules. This command
* should be bound to the `Enter` key by a keymap plugin.
*
* @public
*/
function createEnterRuleCommand({ rules }) {
	return function enterRuleCommand(state, dispatch, view) {
		if (!view) return false;
		return execEnterRules(view, rules, dispatch);
	};
}
/**
* Creates a ProseMirror plugin that handles enter rules.
*
* @public
*/
function createEnterRulePlugin(options) {
	const handler = keydownHandler({ Enter: createEnterRuleCommand(options) });
	return new Plugin({
		key: new PluginKey("prosemirror-enter-rules"),
		props: { handleKeyDown: handler }
	});
}
const OBJECT_REPLACEMENT_CHARACTER = "￼";
const MAX_MATCH = 200;
/**
* Executes enter rules against the current editor state. Returns true if any
* rule matched and was applied.
*/
function execEnterRules(view, rules, dispatch) {
	if (view.composing) return false;
	const selection = view.state.selection;
	if (!(selection instanceof TextSelection)) return false;
	const { $cursor } = selection;
	if (!$cursor || $cursor.parent.type.spec.code) return false;
	const textBefore = $cursor.parent.textBetween(Math.max(0, $cursor.parentOffset - MAX_MATCH), $cursor.parentOffset, null, OBJECT_REPLACEMENT_CHARACTER);
	for (const rule of rules) {
		rule.regex.lastIndex = 0;
		const match = rule.regex.exec(textBefore);
		const tr = match && rule.handler({
			state: view.state,
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

//#endregion
export { createEnterRuleCommand, createEnterRulePlugin, createTextBlockEnterRule };