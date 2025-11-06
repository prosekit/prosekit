import { ProseKitError, defineFacet, defineFacetPayload, editorEventFacet } from "@prosekit/core";

//#region src/file/helpers.ts
function handleFile(view, event, file, handlers) {
	for (let i = handlers.length - 1; i >= 0; i--) {
		const handler = handlers[i];
		if (handler({
			view,
			event,
			file
		})) return true;
	}
	return false;
}
function handleEvent(view, event, handlers, getFiles$2) {
	const files = getFiles$2(event);
	let handled = false;
	for (const file of files) if (handleFile(view, event, file, handlers)) handled = true;
	return handled;
}

//#endregion
//#region src/file/file-drop-handler.ts
function defineFileDropHandler(handler) {
	return defineFacetPayload(facet$1, [handler]);
}
function getFiles$1(event) {
	return Array.from(event.dataTransfer?.files ?? []);
}
const facet$1 = defineFacet({
	parent: editorEventFacet,
	singleton: true,
	reducer: (handlers) => {
		const dropHandler = (view, event) => {
			const position = view.posAtCoords({
				left: event.x,
				top: event.y
			});
			if (!position) return false;
			const pos = position.inside > 0 ? position.inside : position.pos;
			return handleEvent(view, event, handlers.map((handler) => (options) => handler({
				...options,
				pos
			})), getFiles$1);
		};
		return ["drop", dropHandler];
	}
});

//#endregion
//#region src/file/file-paste-handler.ts
function defineFilePasteHandler(handler) {
	return defineFacetPayload(facet, [handler]);
}
function getFiles(event) {
	return Array.from(event.clipboardData?.files ?? []);
}
const facet = defineFacet({
	parent: editorEventFacet,
	singleton: true,
	reducer: (handlers) => {
		const pasteHandler = (view, event) => {
			return handleEvent(view, event, handlers, getFiles);
		};
		return ["paste", pasteHandler];
	}
});

//#endregion
//#region src/file/file-upload.ts
/**
* A class that represents a upload task.
*/
var UploadTask = class {
	/**
	* Creates a new upload task. You can find the upload task by its object URL
	* later using `UploadTask.get()`.
	*
	* @param options - The options for the upload task.
	*/
	constructor({ file, uploader }) {
		this.done = false;
		this.subscribers = [];
		this.objectURL = URL.createObjectURL(file);
		this.finished = new Promise((resolve, reject) => {
			const maybePromise = uploader({
				file,
				onProgress: (progress) => {
					for (const subscriber of this.subscribers) subscriber(progress);
				}
			});
			Promise.resolve(maybePromise).then((result) => {
				this.done = true;
				URL.revokeObjectURL(this.objectURL);
				this.result = result;
				resolve(result);
			}, (err) => {
				this.done = true;
				const error = new ProseKitError("[prosekit] Failed to upload file", { cause: err });
				this.error = error;
				reject(error);
			});
		});
		store.set(this.objectURL, this);
	}
	/**
	* Subscribes to progress updates. Returns a function to unsubscribe.
	*/
	subscribeProgress(callback) {
		this.subscribers.push(callback);
		return () => {
			this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
		};
	}
	/**
	* Finds an upload task from the global store by its object URL.
	*/
	static get(objectURL) {
		return store.get(objectURL);
	}
	/**
	* Deletes an upload task from the global store by its object URL.
	*/
	static delete(objectURL) {
		store.delete(objectURL);
	}
};
const store = /* @__PURE__ */ new Map();

//#endregion
export { defineFilePasteHandler as n, defineFileDropHandler as r, UploadTask as t };
//# sourceMappingURL=file-DKoIIa7q.js.map