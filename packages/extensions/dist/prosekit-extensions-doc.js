import { defineNodeSpec } from "@prosekit/core";
/**
* @public
*/
function defineDoc() {
	return defineNodeSpec({
		name: "doc",
		content: "block+",
		topNode: true
	});
}
export { defineDoc };

//# sourceMappingURL=prosekit-extensions-doc.js.map