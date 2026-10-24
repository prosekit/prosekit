import { defineFacet, defineFacetPayload, getMarkType, getNodeType, isMarkAbsent, maybeRun, pluginFacet } from "@prosekit/core";
import { InputRule, inputRules } from "@prosekit/pm/inputrules";
import { canJoin, findWrapping } from "@prosekit/pm/transform";
/**
* Defines an input rule extension.
*
* @param rule - The ProseMirror input rule to add.
*/
function defineInputRule(rule) {
	return defineInputRuleFacetPayload(() => rule);
}
/**
* @internal
*/
function createMarkInputRule({ regex, type, attrs = null, inCodeMark = false }) {
	return new InputRule(regex, (state, match, start, end) => {
		const { tr, schema } = state;
		const [fullText, markText] = match;
		if (!markText) return null;
		const markStart = start + fullText.indexOf(markText);
		const markEnd = markStart + markText.length;
		if (!(start <= markStart && markStart < markEnd && markEnd <= end)) return null;
		const markType = getMarkType(schema, type);
		const mark = markType.create(maybeRun(attrs, match));
		if (!isMarkAbsent(tr.doc, markStart, markEnd, markType, attrs)) return null;
		const initialStoredMarks = tr.storedMarks ?? [];
		tr.addMark(markStart, markEnd, mark);
		if (markEnd < end) tr.delete(markEnd, end);
		if (start < markStart) tr.delete(start, markStart);
		tr.setStoredMarks(initialStoredMarks);
		return tr;
	}, { inCodeMark });
}
/**
* Defines an input rule for automatically adding inline marks when a given
* pattern is typed.
*/
function defineMarkInputRule(options) {
	return defineInputRule(createMarkInputRule(options));
}
/**
* Defines an input rule that changes the type of a textblock when the matched
* text is typed into it.
*
* See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)
*
* @param options
*/
function defineTextBlockInputRule(options) {
	return defineInputRule(new InputRule(options.regex, createTextBlockInputRuleHandler(options)));
}
/**
* The handler behind {@link defineTextBlockInputRule}: it replaces the matched
* text and changes the textblock to `type`. The node type is resolved from the
* state's schema when the rule fires.
*
* @internal
*/
function createTextBlockInputRuleHandler({ type, attrs }) {
	return (state, match, start, end) => {
		const nodeType = getNodeType(state.schema, type);
		const $start = state.doc.resolve(start);
		if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) return null;
		return state.tr.delete(start, end).setBlockType(start, start, nodeType, maybeRun(attrs, match));
	};
}
/**
* Defines an input rule for automatically wrapping a textblock when a given
* string is typed.
*
* See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)
*
* @param options
*/
function defineWrappingInputRule(options) {
	return defineInputRule(new InputRule(options.regex, createWrappingInputRuleHandler(options)));
}
/**
* The handler behind {@link defineWrappingInputRule}: it deletes the matched
* text and wraps the textblock in `type`, joining it with a preceding node of
* the same type. The node type is resolved from the state's schema when the
* rule fires.
*
* @internal
*/
function createWrappingInputRuleHandler({ type, attrs, join }) {
	return (state, match, start, end) => {
		const nodeType = getNodeType(state.schema, type);
		const nodeAttrs = maybeRun(attrs, match);
		const tr = state.tr.delete(start, end);
		const range = tr.doc.resolve(start).blockRange();
		const wrapping = range && findWrapping(range, nodeType, nodeAttrs);
		if (!range || !wrapping) return null;
		tr.wrap(range, wrapping);
		const before = tr.doc.resolve(start - 1).nodeBefore;
		if (before && before.type === nodeType && canJoin(tr.doc, start - 1) && (!join || join(match, before))) return tr.join(start - 1);
		return tr;
	};
}
function defineInputRuleFacetPayload(input) {
	return defineFacetPayload(inputRuleFacet, [input]);
}
const inputRuleFacet = defineFacet({
	reducer: (inputs) => {
		return (context) => {
			const rules = inputs.flatMap((callback) => callback(context));
			return [inputRules({ rules })];
		};
	},
	parent: pluginFacet
});
export { createMarkInputRule, createTextBlockInputRuleHandler, createWrappingInputRuleHandler, defineInputRule, defineMarkInputRule, defineTextBlockInputRule, defineWrappingInputRule };

//# sourceMappingURL=input-rule.js.map