import { OBJECT_REPLACEMENT_CHARACTER, defineFacet, defineFacetPayload, pluginFacet } from "@prosekit/core";
import { Plugin, PluginKey } from "@prosekit/pm/state";
import { Decoration, DecorationSet } from "@prosekit/pm/view";

//#region src/autocomplete/autocomplete-helpers.ts
function defaultCanMatch({ state }) {
	return state.selection.empty && !isInsideCode(state.selection.$from);
}
function isInsideCode($pos) {
	for (let d = $pos.depth; d > 0; d--) if ($pos.node(d).type.spec.code) return true;
	return $pos.marks().some((mark) => mark.type.name === "code");
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
//#region src/autocomplete/autocomplete-plugin.ts
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
				const meta = getTrMeta(tr);
				if (!tr.docChanged && oldState.selection.eq(newState.selection) && !meta) return prevValue;
				if (meta) {
					let ignores = prevValue.ignores;
					if (!ignores.includes(meta.ignore)) ignores = [...ignores, meta.ignore];
					return {
						matching: null,
						ignores
					};
				}
				const ignoreSet = new Set(prevValue.ignores.map((pos) => tr.mapping.map(pos)));
				let matching = calcPluginStateMatching(newState, getRules());
				if (matching && ignoreSet.has(matching.from)) matching = null;
				return {
					matching,
					ignores: Array.from(ignoreSet)
				};
			}
		},
		view: () => ({ update: (view, prevState) => {
			const prevValue = getPluginState(prevState);
			const currValue = getPluginState(view.state);
			if (prevValue?.matching && prevValue.matching.rule !== currValue?.matching?.rule) prevValue.matching.rule.onLeave?.();
			if (currValue?.matching && !currValue.ignores.includes(currValue.matching.from)) {
				const { from, to, match, rule } = currValue.matching;
				const textContent = view.state.doc.textBetween(from, to, null, OBJECT_REPLACEMENT_CHARACTER);
				const deleteMatch = () => {
					if (view.state.doc.textBetween(from, to, null, OBJECT_REPLACEMENT_CHARACTER) === textContent) view.dispatch(view.state.tr.delete(from, to));
				};
				const ignoreMatch = () => {
					view.dispatch(setTrMeta(view.state.tr, { ignore: from }));
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
		} }),
		props: { decorations: (state) => {
			const pluginState = getPluginState(state);
			if (pluginState?.matching) {
				const { from, to } = pluginState.matching;
				const deco = Decoration.inline(from, to, { class: "prosemirror-prediction-match" });
				return DecorationSet.create(state.doc, [deco]);
			}
			return null;
		} }
	});
}
const MAX_MATCH = 200;
function calcPluginStateMatching(state, rules) {
	const $pos = state.selection.$from;
	const parentOffset = $pos.parentOffset;
	const textBefore = $pos.parent.textBetween(Math.max(0, parentOffset - MAX_MATCH), parentOffset, null, OBJECT_REPLACEMENT_CHARACTER);
	for (const rule of rules) {
		if (!rule.canMatch({ state })) continue;
		rule.regex.lastIndex = 0;
		const match = rule.regex.exec(textBefore);
		if (!match) continue;
		const to = $pos.pos;
		return {
			rule,
			match,
			from: to - textBefore.length + match.index,
			to
		};
	}
	return null;
}

//#endregion
//#region src/autocomplete/autocomplete.ts
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
export { AutocompleteRule, defineAutocomplete };
//# sourceMappingURL=prosekit-extensions-autocomplete.js.map