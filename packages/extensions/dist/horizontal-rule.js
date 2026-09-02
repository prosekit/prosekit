import { defineInputRule } from "./input-rule.js";
import { TextSelection } from "@prosekit/pm/state";
import { defaultBlockAt, defineCommands, defineNodeSpec, getNodeType, isNodeSelection, union } from "@prosekit/core";
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
function defineHorizontalRuleInputRule() {
	return defineInputRule(new InputRule(/^---$/, (state, match, start, end) => {
		const { schema } = state;
		const { tr } = state;
		const type = getNodeType(schema, "horizontalRule");
		const $start = state.doc.resolve(start);
		const index = $start.index(-1);
		if (!$start.node(-1).canReplaceWith(index, index, type)) return null;
		const node = type.createChecked();
		tr.replaceRangeWith($start.before(), end, node);
		const { selection } = tr;
		if (isNodeSelection(selection) && selection.node.type === type) {
			const pos = selection.$to.pos;
			const $pos = tr.doc.resolve(pos);
			const block = defaultBlockAt($pos.parent.contentMatchAt($pos.index()))?.createAndFill();
			if (block) {
				tr.insert(pos, block);
				tr.setSelection(TextSelection.create(tr.doc, pos + 1));
			}
		}
		return tr.scrollIntoView();
	}));
}
function defineHorizontalRuleSpec() {
	return defineNodeSpec({
		name: "horizontalRule",
		group: "block",
		parseDOM: [{ tag: "div.prosekit-horizontal-rule" }, { tag: "hr" }],
		toDOM: () => [
			"div",
			{ class: "prosekit-horizontal-rule" },
			["hr"]
		]
	});
}
function defineHorizontalRule() {
	return union(defineHorizontalRuleSpec(), defineHorizontalRuleInputRule(), defineHorizontalRuleCommands());
}
export { defineHorizontalRule, defineHorizontalRuleCommands, defineHorizontalRuleInputRule, defineHorizontalRuleSpec, insertHorizontalRule };

//# sourceMappingURL=horizontal-rule.js.map