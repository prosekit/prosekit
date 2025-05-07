import { defineNodeSpec } from "@prosekit/core";

//#region src/text/index.ts
/**
* @public
*/
function defineText() {
	return defineNodeSpec({
		name: "text",
		group: "inline"
	});
}

//#endregion
export { defineText };