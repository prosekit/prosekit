import { defineNodeSpec } from "@prosekit/core";

//#region src/doc/index.ts
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

//#endregion
export { defineDoc };
//# sourceMappingURL=prosekit-extensions-doc.js.map