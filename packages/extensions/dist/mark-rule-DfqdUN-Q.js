import { OBJECT_REPLACEMENT_CHARACTER, defineFacet, defineFacetPayload, getMarkType, maybeRun, pluginFacet } from "@prosekit/core";
import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";

//#region src/mark-rule/range.ts
function getSpanTextRanges($from, $to) {
	const nodeRange = $from.blockRange($to);
	if (!nodeRange) return [];
	const stack = [];
	let start = nodeRange.start;
	for (let i = nodeRange.startIndex; i < nodeRange.endIndex; i++) {
		const child = nodeRange.parent.child(i);
		stack.push([start, child]);
		start += child.nodeSize;
	}
	const ranges = [];
	while (stack.length > 0) {
		const [start$1, node] = stack.pop();
		if (node.type.spec.code) continue;
		if (node.type.isTextblock) {
			ranges.push([start$1 + 1, start$1 + 1 + node.content.size]);
			continue;
		}
		node.forEach((child, offset) => {
			stack.push([start$1 + offset + 1, child]);
		});
	}
	return ranges;
}
function getInlineTextRange($from, $to) {
	return [$from.start(), $to.end()];
}
function getTextRanges(doc, from, to) {
	const $from = doc.resolve(from);
	const $to = doc.resolve(to);
	if ($from.sameParent($to) && $from.parent.isTextblock) return [getInlineTextRange($from, $to)];
	else {
		if (!$from.blockRange($to)) return [];
		return getSpanTextRanges($from, $to);
	}
}
function getMapRange(transactions, oldState, newState) {
	let lo = oldState.selection.from;
	let hi = oldState.selection.to;
	for (const tr of transactions) for (const map of tr.mapping.maps) {
		lo = map.map(lo);
		hi = map.map(hi);
		map.forEach((_oldStart, _oldEnd, newStart, newEnd) => {
			lo = Math.min(lo, hi, newStart);
			hi = Math.max(lo, hi, newEnd);
		});
	}
	lo = Math.min(lo, hi, newState.selection.from);
	hi = Math.min(lo, hi, newState.selection.to);
	return [lo, hi];
}
function getCheckRanges(transactions, oldState, newState) {
	const [from, to] = getMapRange(transactions, oldState, newState);
	return getTextRanges(newState.doc, from, to);
}

//#endregion
//#region src/mark-rule/apply.ts
function getExpectedMarkings(rules, doc, from, to) {
	const text = doc.textBetween(from, to, null, OBJECT_REPLACEMENT_CHARACTER);
	const ranges = [];
	for (const rule of rules) {
		rule.regex.lastIndex = 0;
		const matches = text.matchAll(rule.regex);
		const markType = getMarkType(doc.type.schema, rule.type);
		for (const match of matches) {
			const index = match.index;
			if (index == null) continue;
			const attrs = maybeRun(rule.attrs, match);
			const mark = markType.create(attrs);
			ranges.push([
				from + index,
				from + index + match[0].length,
				mark
			]);
		}
	}
	ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
	const result = [];
	let freeIndex = 0;
	for (const range of ranges) if (range[0] >= freeIndex) {
		result.push(range);
		freeIndex = range[1];
	}
	return result;
}
function getReceivedMarkings(rules, doc, from, to) {
	const result = [];
	const schema = doc.type.schema;
	const markTypes = rules.map((rule) => getMarkType(schema, rule.type));
	doc.nodesBetween(from, to, (node, pos) => {
		if (!node.isInline) return;
		for (const markType of markTypes) {
			const mark = node.marks.find((mark$1) => mark$1.type === markType);
			if (mark) result.push([
				pos,
				pos + node.nodeSize,
				mark
			]);
		}
	});
	return result;
}
function markRangeEquals(a, b) {
	return a[0] === b[0] && a[1] === b[1] && a[2].eq(b[2]);
}
function markRangeDiffs(a, b) {
	return a.filter((x) => !b.some((y) => markRangeEquals(x, y)));
}
function applyMarkRules(rules, transactions, oldState, newState) {
	if (transactions.length === 0 || transactions.every((tr$1) => !tr$1.docChanged)) return null;
	const ranges = getCheckRanges(transactions, oldState, newState);
	const toRemove = [];
	const toCreate = [];
	for (const [from, to] of ranges) {
		const expected = getExpectedMarkings(rules, newState.doc, from, to);
		const received = getReceivedMarkings(rules, newState.doc, from, to);
		toRemove.push(...markRangeDiffs(received, expected));
		toCreate.push(...markRangeDiffs(expected, received));
	}
	if (toCreate.length === 0 && toRemove.length === 0) return null;
	const tr = newState.tr;
	for (const [from, to, mark] of toRemove) tr.removeMark(from, to, mark);
	for (const [from, to, mark] of toCreate) tr.addMark(from, to, mark);
	return tr;
}

//#endregion
//#region src/mark-rule/mark-rule.ts
/**
* A mark rule is something that can automatically apply marks to text if it
* matches a certain pattern, and remove them if it doesn't match anymore.
*/
function defineMarkRule(options) {
	return defineFacetPayload(markRuleFacet, [options]);
}
const markRuleFacet = defineFacet({
	reduce: () => {
		let rules = [];
		const plugin = new ProseMirrorPlugin({
			key: new PluginKey("prosekit-mark-rule"),
			appendTransaction: (transactions, oldState, newState) => {
				return applyMarkRules(rules, transactions, oldState, newState);
			}
		});
		return function reducer(input) {
			rules = input;
			return plugin;
		};
	},
	parent: pluginFacet
});

//#endregion
export { defineMarkRule as t };
//# sourceMappingURL=mark-rule-DfqdUN-Q.js.map