import { defineInputRule } from "./prosekit-extensions-input-rule.js";
import { defineCommands, defineNodeSpec, getNodeType, union } from "@prosekit/core";
import { InputRule } from "@prosekit/pm/inputrules";
import { Fragment, Slice } from "@prosekit/pm/model";
const insertHorizontalRuleCommand = (state, dispatch) => {
	if (!dispatch) return true;
	const { schema, tr } = state;
	const node = getNodeType(schema, "horizontalRule").createChecked();
	const pos = tr.selection.anchor;
	const slice = new Slice(Fragment.from(node), 0, 0);
	tr.replaceRange(pos, pos, slice).scrollIntoView();
	dispatch(tr);
	return true;
};
/**
* Returns a command that inserts a horizontal rule at the current selection.
*/
function insertHorizontalRule() {
	return insertHorizontalRuleCommand;
}
function defineHorizontalRuleCommands() {
	return defineCommands({ insertHorizontalRule });
}
/**
* @public
*/
function defineHorizontalRuleInputRule() {
	return union(defineInputRule(new InputRule(/^---$/, (state, match, start, end) => {
		const { schema } = state;
		const { tr } = state;
		const node = getNodeType(schema, "horizontalRule").createChecked();
		tr.delete(start, end).insert(start - 1, node);
		return tr.scrollIntoView();
	})));
}
function defineHorizontalRuleSpec() {
	return defineNodeSpec({
		name: "horizontalRule",
		group: "block",
		parseDOM: [{ tag: "hr" }],
		toDOM: () => [
			"div",
			{ class: "prosekit-horizontal-rule" },
			["hr"]
		]
	});
}
/**
* @public
*/
function defineHorizontalRule() {
	return union(defineHorizontalRuleSpec(), defineHorizontalRuleInputRule(), defineHorizontalRuleCommands());
}
export { defineHorizontalRule, defineHorizontalRuleCommands, defineHorizontalRuleInputRule, defineHorizontalRuleSpec, insertHorizontalRule };

//# sourceMappingURL=prosekit-extensions-horizontal-rule.js.map