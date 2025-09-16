import { useEffect } from "@aria-ui/core";

//#region src/hooks/use-editor-extension.ts
function useEditorExtension(host, editor, extension) {
	useEffect(host, () => {
		return editor.get()?.use(extension);
	});
}

//#endregion
export { useEditorExtension };
//# sourceMappingURL=use-editor-extension-Cc7ZG7uj.js.map