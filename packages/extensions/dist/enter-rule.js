import { defineFacet, defineFacetPayload, pluginFacet } from "@prosekit/core";
import { createEnterRulePlugin, createTextBlockEnterRule } from "prosemirror-enter-rules";
/**
* Defines an enter rule. An enter rule applies when the text directly in front of
* the cursor matches `regex` and user presses Enter. The `regex` should end
* with `$`.
*
* @param options
*/
function defineEnterRule(options) {
	return defineFacetPayload(enterRuleFacet, [options]);
}
/**
* Defines an enter rule that replaces the matched text with a block node.
*
* See also {@link defineEnterRule}.
*
* @param options
*/
function defineTextBlockEnterRule(options) {
	return defineEnterRule(createTextBlockEnterRule(options));
}
const enterRuleFacet = defineFacet({
	reducer: (rules) => {
		return createEnterRulePlugin({ rules });
	},
	parent: pluginFacet
});
export { defineEnterRule, defineTextBlockEnterRule };

//# sourceMappingURL=enter-rule.js.map