import { defineCommands, defineNodeSpec, insertNode, union } from "@prosekit/core";

//#region src/mention/index.ts
/**
* @public
*/
function defineMentionSpec() {
	return defineNodeSpec({
		name: "mention",
		atom: true,
		group: "inline",
		attrs: {
			id: { validate: "string" },
			value: { validate: "string" },
			kind: {
				default: "",
				validate: "string"
			}
		},
		inline: true,
		leafText: (node) => node.attrs.value.toString(),
		parseDOM: [{
			tag: `span[data-mention]`,
			getAttrs: (dom) => ({
				id: dom.getAttribute("data-id") || "",
				kind: dom.getAttribute("data-mention") || "",
				value: dom.textContent || ""
			})
		}],
		toDOM(node) {
			return [
				"span",
				{
					"data-id": node.attrs.id.toString(),
					"data-mention": node.attrs.kind.toString()
				},
				node.attrs.value.toString()
			];
		}
	});
}
function defineMentionCommands() {
	return defineCommands({ insertMention: (attrs) => {
		return insertNode({
			type: "mention",
			attrs
		});
	} });
}
/**
* @public
*/
function defineMention() {
	return union(defineMentionSpec(), defineMentionCommands());
}

//#endregion
export { defineMention, defineMentionCommands, defineMentionSpec };
//# sourceMappingURL=prosekit-extensions-mention.js.map