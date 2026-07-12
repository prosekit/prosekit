import { defineCommands, defineNodeSpec, insertNode, union } from "@prosekit/core";
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
		leafText: (node) => node.attrs.value,
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
					"data-id": node.attrs.id,
					"data-mention": node.attrs.kind
				},
				node.attrs.value
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
function defineMention() {
	return union(defineMentionSpec(), defineMentionCommands());
}
export { defineMention, defineMentionCommands, defineMentionSpec };

//# sourceMappingURL=mention.js.map