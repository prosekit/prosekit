import { useEffect } from "@aria-ui/core";

//#region src/hooks/use-editor-extension.ts
function useEditorExtension(host, editor, extension) {
	useEffect(host, () => {
		return editor.get()?.use(extension);
	});
}

//#endregion
export { useEditorExtension };