import { defineInputRule } from "./prosekit-extensions-input-rule.js";
import { defineCommands, defineNodeSpec, getNodeType, union } from "@prosekit/core";
import { InputRule } from "@prosekit/pm/inputrules";
import { Fragment, Slice } from "@prosekit/pm/model";

//#region src/horizontal-rule/horizontal-rule-commands.ts
/**
* Returns a command that inserts a horizontal rule at the current selection.
*/
function insertHorizontalRule() {
	return (state, dispatch) => {
		if (!dispatch) return true;
		const { schema, tr } = state;
		const node = getNodeType(schema, "horizontalRule").createChecked();
		const pos = tr.selection.anchor;
		tr.replaceRange(pos, pos, new Slice(Fragment.from(node), 0, 0));
		dispatch(tr);
		return true;
	};
}
function defineHorizontalRuleCommands() {
	return defineCommands({ insertHorizontalRule });
}

//#endregion
//#region src/horizontal-rule/horizontal-rule-input-rule.ts
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

//#endregion
//#region src/horizontal-rule/horizontal-rule-spec.ts
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

//#endregion
//#region src/horizontal-rule/horizontal-rule.ts
/**
* @public
*/
function defineHorizontalRule() {
	return union(defineHorizontalRuleSpec(), defineHorizontalRuleInputRule(), defineHorizontalRuleCommands());
}

//#endregion
export { defineHorizontalRule, defineHorizontalRuleCommands, defineHorizontalRuleInputRule, defineHorizontalRuleSpec, insertHorizontalRule };
//# sourceMappingURL=prosekit-extensions-horizontal-rule.js.map