import { Plugin, PluginKey } from "@prosekit/pm/state";
import { OBJECT_REPLACEMENT_CHARACTER, defineFacet, defineFacetPayload, pluginFacet } from "@prosekit/core";
import { Decoration, DecorationSet } from "@prosekit/pm/view";

//#region src/autocomplete/autocomplete-helpers.ts
function defaultCanMatch({ state }) {
	const $pos = state.selection.$from;
	return !isInsideCodeBlock($pos) && !isInsideCodeMark($pos);
}
function isInsideCodeBlock($pos) {
	for (let d = $pos.depth; d > 0; d--) if ($pos.node(d).type.spec.code) return true;
	return false;
}
function isInsideCodeMark($pos) {
	for (const mark of $pos.marks()) if (mark.type.spec.code) return true;
	return false;
}
function getPluginState(state) {
	return pluginKey.getState(state);
}
function getTrMeta(tr) {
	return tr.getMeta(pluginKey);
}
function setTrMeta(tr, meta) {
	return tr.setMeta(pluginKey, meta);
}
const pluginKey = new PluginKey("prosekit-autocomplete");

//#endregion
//#region src/autocomplete/autocomplete-rule.ts
/**
* An autocomplete rule that can be used to create an autocomplete extension.
*
* @public
*/
var AutocompleteRule = class {
	constructor(options) {
		this.regex = options.regex;
		this.onMatch = options.onEnter;
		this.onLeave = options.onLeave;
		this.canMatch = options.canMatch ?? defaultCanMatch;
	}
};

//#endregion
//#region src/autocomplete/autocomplete-plugin.ts
/**
* Creates a plugin that handles autocomplete functionality.
*
* Workflow:
*
* 1. {@link handleTextInput}: called when text is going to be input, but the
*    transaction is not yet created. Injects a new matching as a transaction
*    meta if applicable. This is the only place to create a new matching if
*    there is no existing matching.
* 2. {@link handleTransaction}: called when a transaction is going to be
*    applied. Updates the plugin state based on the transaction. This step
*    determines if a matching should be created, updated or removed.
* 3. {@link handleUpdate}: called when the editor state is updated. This is the
*    place to call `onMatch` and register `deleteMatch` and `ignoreMatch`
*    callbacks.
* 4. {@link getDecorations}: creates the decorations for the current matching.
*/
function createAutocompletePlugin({ getRules }) {
	return new Plugin({
		key: pluginKey,
		state: {
			init: () => {
				return {
					ignores: [],
					matching: null
				};
			},
			apply: (tr, prevValue, oldState, newState) => {
				return handleTransaction(tr, prevValue, oldState, newState, getRules);
			}
		},
		view: () => ({ update: handleUpdate }),
		props: {
			handleTextInput: (view, from, to, textAdded, getTr) => {
				const meta = handleTextInput(view, from, to, textAdded, getRules);
				if (meta) {
					const tr = getTr();
					setTrMeta(tr, meta);
					view.dispatch(tr);
					return true;
				}
				return false;
			},
			decorations: getDecorations
		}
	});
}
function handleTextInput(view, from, to, textAdded, getRules) {
	if (from !== to) return;
	const textFull = getTextBackward(view.state.doc.resolve(from)) + textAdded;
	const textTo = to + textAdded.length;
	const textFrom = textTo - textFull.length;
	const ignores = getPluginState(view.state)?.ignores ?? [];
	const currMatching = matchRule(view.state, getRules(), textFull, textFrom, textTo, ignores);
	if (currMatching) return {
		type: "enter",
		matching: currMatching
	};
}
function handleTransaction(tr, prevValue, oldState, newState, getRules) {
	const meta = getTrMeta(tr);
	if (!meta && !tr.docChanged && oldState.selection.eq(newState.selection)) return prevValue;
	const ignoreSet = /* @__PURE__ */ new Set();
	for (const ignore of prevValue.ignores) {
		const result = tr.mapping.mapResult(ignore);
		if (!result.deletedBefore && !result.deletedAfter) ignoreSet.add(result.pos);
	}
	const ignores = Array.from(ignoreSet);
	const prevMatching = prevValue.matching && mapMatching(prevValue.matching, tr.mapping);
	if (!meta) {
		if (!prevMatching) return {
			matching: null,
			ignores
		};
		const { selection } = newState;
		if (selection.to < prevMatching.from || selection.from > prevMatching.to) {
			ignores.push(prevMatching.from);
			return {
				matching: null,
				ignores
			};
		}
		const text = getTextBetween(newState.doc, prevMatching.from, prevMatching.to);
		return {
			matching: matchRule(newState, getRules(), text, prevMatching.from, prevMatching.to, ignores) ?? null,
			ignores
		};
	}
	if (meta.type === "enter") {
		if (prevMatching && prevMatching.from !== meta.matching.from) ignores.push(prevMatching.from);
		return {
			matching: meta.matching,
			ignores
		};
	}
	if (meta.type === "leave") {
		if (prevMatching) ignores.push(prevMatching.from);
		return {
			matching: null,
			ignores
		};
	}
	throw new Error(`Invalid transaction meta: ${meta}`);
}
function handleUpdate(view, prevState) {
	const prevValue = getPluginState(prevState);
	const currValue = getPluginState(view.state);
	if (!prevValue || !currValue) return;
	const prevMatching = prevValue.matching;
	const currMatching = currValue.matching;
	if (prevMatching && prevMatching.rule !== currMatching?.rule) prevMatching.rule.onLeave?.();
	if (currMatching) {
		const { from, to, match, rule } = currMatching;
		const textSnapshot = getTextBetween(view.state.doc, from, to);
		const deleteMatch = () => {
			if (getTextBetween(view.state.doc, from, to) === textSnapshot) view.dispatch(view.state.tr.delete(from, to));
		};
		const ignoreMatch = () => {
			view.dispatch(setTrMeta(view.state.tr, { type: "leave" }));
		};
		rule.onMatch({
			state: view.state,
			match,
			from,
			to,
			deleteMatch,
			ignoreMatch
		});
	}
}
function getDecorations(state) {
	const pluginState = getPluginState(state);
	if (pluginState?.matching) {
		const { from, to, match } = pluginState.matching;
		const deco = Decoration.inline(from, to, {
			"class": "prosekit-autocomplete-match",
			"data-autocomplete-match-text": match[0]
		});
		return DecorationSet.create(state.doc, [deco]);
	}
	return null;
}
const MAX_MATCH = 200;
/** Get the text before the given position at the current block. */
function getTextBackward($pos) {
	const parentOffset = $pos.parentOffset;
	return getTextBetween($pos.parent, Math.max(0, parentOffset - MAX_MATCH), parentOffset);
}
function getTextBetween(node, from, to) {
	return node.textBetween(from, to, null, OBJECT_REPLACEMENT_CHARACTER);
}
function matchRule(state, rules, text, textFrom, textTo, ignores) {
	let maxIgnore = -1;
	for (const ignore of ignores) if (ignore >= textFrom && ignore < textTo && ignore > maxIgnore) maxIgnore = ignore;
	if (maxIgnore >= 0) {
		const cut = maxIgnore + 1 - textFrom;
		text = text.slice(cut);
		textFrom += cut;
	}
	if (textFrom >= textTo || !text) return;
	for (const rule of rules) {
		if (!rule.canMatch({ state })) continue;
		rule.regex.lastIndex = 0;
		const match = rule.regex.exec(text);
		if (!match) continue;
		const matchTo = textTo;
		return {
			rule,
			match,
			from: textFrom + match.index,
			to: matchTo
		};
	}
}
function mapMatching(matching, mapping) {
	return {
		rule: matching.rule,
		match: matching.match,
		from: mapping.map(matching.from),
		to: mapping.map(matching.to, -1)
	};
}

//#endregion
//#region src/autocomplete/autocomplete.ts
/**
* Defines an autocomplete extension that executes logic when the text before
* the cursor matches the given regular expression.
*
* When a match is found, an inline decoration is applied to the matched text
* with the class `prosekit-autocomplete-match` and a `data-autocomplete-match-text`
* attribute containing the full matched string.
*/
function defineAutocomplete(rule) {
	return defineFacetPayload(autocompleteFacet, [rule]);
}
const autocompleteFacet = defineFacet({
	reduce: () => {
		let rules = [];
		const getRules = () => rules;
		const plugin = createAutocompletePlugin({ getRules });
		return function reducer(inputs) {
			rules = inputs;
			return plugin;
		};
	},
	parent: pluginFacet,
	singleton: true
});

//#endregion
export { AutocompleteRule, defineAutocomplete };
//# sourceMappingURL=prosekit-extensions-autocomplete.js.map