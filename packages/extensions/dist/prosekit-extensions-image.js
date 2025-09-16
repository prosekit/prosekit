import { defineCommands, defineNodeSpec, insertNode, union } from "@prosekit/core";

//#region src/image/image-commands.ts
/**
* @internal
*/
function defineImageCommands() {
	return defineCommands({ insertImage: (attrs) => {
		return insertNode({
			type: "image",
			attrs
		});
	} });
}

//#endregion
//#region src/image/image-spec.ts
/**
* @internal
*/
function defineImageSpec() {
	return defineNodeSpec({
		name: "image",
		attrs: {
			src: {
				default: null,
				validate: "string|null"
			},
			width: {
				default: null,
				validate: "number|null"
			},
			height: {
				default: null,
				validate: "number|null"
			}
		},
		group: "block",
		defining: true,
		draggable: true,
		parseDOM: [{
			tag: "img[src]",
			getAttrs: (element) => {
				if (typeof element === "string") return { src: null };
				const src = element.getAttribute("src") || null;
				let width = null;
				let height = null;
				const rect = element.getBoundingClientRect();
				if (rect.width > 0 && rect.height > 0) {
					width = rect.width;
					height = rect.height;
				} else if (element instanceof HTMLImageElement && element.naturalWidth > 0 && element.naturalHeight > 0) {
					width = element.naturalWidth;
					height = element.naturalHeight;
				}
				return {
					src,
					width,
					height
				};
			}
		}],
		toDOM(node) {
			return ["img", node.attrs];
		}
	});
}

//#endregion
//#region src/image/image.ts
/**
* @public
*/
function defineImage() {
	return union(defineImageSpec(), defineImageCommands());
}

//#endregion
export { defineImage, defineImageCommands, defineImageSpec };
//# sourceMappingURL=prosekit-extensions-image.js.map