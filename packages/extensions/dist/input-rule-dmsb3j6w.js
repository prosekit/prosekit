import { defineFacet, defineFacetPayload, getMarkType, getNodeType, isMarkAbsent, maybeRun, pluginFacet } from "@prosekit/core";
import { InputRule, inputRules, textblockTypeInputRule, wrappingInputRule } from "@prosekit/pm/inputrules";

//#region src/input-rule/index.ts
/**
* Defines an input rule extension.
*
* @param rule - The ProseMirror input rule to add.
*
* @public
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
*
* @public
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
*
* @public
*/
function defineTextBlockInputRule({ regex, type, attrs }) {
	return defineInputRuleFacetPayload(({ schema }) => {
		return textblockTypeInputRule(regex, getNodeType(schema, type), attrs);
	});
}
/**
* Defines an input rule for automatically wrapping a textblock when a given
* string is typed.
*
* See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)
*
* @param options
*
* @public
*/
function defineWrappingInputRule({ regex, type, attrs, join }) {
	return defineInputRuleFacetPayload(({ schema }) => {
		return wrappingInputRule(regex, getNodeType(schema, type), attrs, join);
	});
}
function defineInputRuleFacetPayload(input) {
	return defineFacetPayload(inputRuleFacet, [input]);
}
const inputRuleFacet = defineFacet({
	reducer: (inputs) => {
		return (context) => {
			return [inputRules({ rules: inputs.flatMap((callback) => callback(context)) })];
		};
	},
	parent: pluginFacet
});

//#endregion
export { defineWrappingInputRule as a, defineTextBlockInputRule as i, defineInputRule as n, defineMarkInputRule as r, createMarkInputRule as t };
//# sourceMappingURL=input-rule-dmsb3j6w.js.map