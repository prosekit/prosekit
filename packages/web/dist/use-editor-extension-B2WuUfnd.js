import { useEffect } from "@aria-ui/core";

//#region src/hooks/use-editor-extension.ts
function useEditorExtension(host, editor, extension) {
	useEffect(host, () => {
		return editor.get()?.use(extension);
	});
}

//#endregion
export { useEditorExtension as t };
//# sourceMappingURL=use-editor-extension-B2WuUfnd.js.map