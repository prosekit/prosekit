import { defineNodeSpec } from "@prosekit/core";
function defineDoc() {
	return defineNodeSpec({
		name: "doc",
		content: "block+",
		topNode: true
	});
}
export { defineDoc };

//# sourceMappingURL=doc.js.map