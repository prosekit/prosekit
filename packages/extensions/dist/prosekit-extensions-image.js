import { n as defineFilePasteHandler, r as defineFileDropHandler, t as UploadTask } from "./file-DrfcSid-.js";
import { ProseKitError, defineCommands, defineNodeSpec, insertNode, union } from "@prosekit/core";

//#region src/image/image-commands/insert-image.ts
/**
* Returns a command that inserts an image node with the given attributes at the
* current selection position.
*
* @public
*/
function insertImage(attrs) {
	return insertNode({
		type: "image",
		attrs
	});
}

//#endregion
//#region src/image/image-commands/upload-image.ts
/**
* Returns a command that uploads an image file and inserts an image node with a
* temporary URL which is replaced once the upload completes.
*
* @param options
*
* @public
*/
function uploadImage({ uploader, file, pos, onError }) {
	return (state, dispatch, view) => {
		const uploadTask = new UploadTask({
			file,
			uploader
		});
		const objectURL = uploadTask.objectURL;
		const attrs = { src: objectURL };
		uploadTask.finished.then((resultURL) => {
			if (view && view.isDestroyed) return;
			else if (typeof resultURL !== "string") {
				const error = new ProseKitError(`Unexpected upload result. Expected a string but got ${typeof resultURL}`);
				onError?.({
					file,
					error,
					uploadTask
				});
			} else if (!view) {
				const error = new ProseKitError("View must be available to replace the image URL");
				onError?.({
					file,
					error,
					uploadTask
				});
			} else {
				replaceImageURL(view, objectURL, resultURL);
				UploadTask.delete(objectURL);
			}
		}).catch((error) => {
			onError?.({
				file,
				error,
				uploadTask
			});
		});
		return insertNode({
			type: "image",
			attrs,
			pos
		})(state, dispatch, view);
	};
}
/**
* Replaces the temporary image URL with the final uploaded URL.
*
* @internal
*/
function replaceImageURL(view, oldURL, newURL) {
	const positions = [];
	view.state.doc.descendants((node, pos) => {
		if (node.type.name === "image") {
			if (node.attrs.src === oldURL) positions.push(pos);
		}
	});
	if (positions.length === 0) return;
	const tr = view.state.tr;
	for (const pos of positions) tr.setNodeAttribute(pos, "src", newURL);
	view.dispatch(tr);
}

//#endregion
//#region src/image/image-commands.ts
/**
* @internal
*/
function defineImageCommands() {
	return defineCommands({
		insertImage,
		uploadImage
	});
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
//#region src/image/image-upload-handler.ts
function defaultCanUpload({ file }) {
	return file.type.startsWith("image/");
}
const defaultOnError = ({ error }) => {
	console.error("[prosekit] Failed to upload image:", error);
};
/**
* Returns an extension that handles image file uploads when pasting or dropping
* images into the editor.
*
* @param options
*/
function defineImageUploadHandler({ uploader, canPaste = defaultCanUpload, canDrop = defaultCanUpload, onError = defaultOnError }) {
	const handlePaste = (options) => {
		if (!canPaste(options)) return false;
		const { view, file } = options;
		return uploadImage({
			uploader,
			file,
			onError
		})(view.state, view.dispatch, view);
	};
	const handleDrop = (options) => {
		if (!canDrop(options)) return false;
		const { view, file, pos } = options;
		return uploadImage({
			uploader,
			file,
			onError,
			pos
		})(view.state, view.dispatch, view);
	};
	return union(defineFilePasteHandler(handlePaste), defineFileDropHandler(handleDrop));
}

//#endregion
export { defineImage, defineImageCommands, defineImageSpec, defineImageUploadHandler, insertImage, replaceImageURL, uploadImage };
//# sourceMappingURL=prosekit-extensions-image.js.map