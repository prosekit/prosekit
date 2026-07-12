import { defineMarkInputRule } from "./input-rule.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";
/**
* @internal
*/
function defineHighlightCommands() {
	return defineCommands({ toggleHighlight: () => toggleMark({ type: "highlight" }) });
}
/**
* @internal
*/
function defineHighlightInputRule() {
	return defineMarkInputRule({
		regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : "") + String.raw`==([^\s=]|[^\s=][^=]*[^\s=])==$`),
		type: "highlight"
	});
}
/**
* @internal
*/
function defineHighlightKeymap() {
	return defineKeymap({ "Mod-Shift-h": toggleMark({ type: "highlight" }) });
}
/**
* @internal
*/
function defineHighlightSpec() {
	return defineMarkSpec({
		name: "highlight",
		parseDOM: [{ tag: "mark" }],
		toDOM() {
			return ["mark", 0];
		}
	});
}
function defineHighlight() {
	return union(defineHighlightSpec(), defineHighlightCommands(), defineHighlightKeymap(), defineHighlightInputRule());
}
export { defineHighlight, defineHighlightCommands, defineHighlightInputRule, defineHighlightKeymap, defineHighlightSpec };

//# sourceMappingURL=highlight.js.map