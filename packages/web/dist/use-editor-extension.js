import { useEffect } from "@aria-ui/core";
function useEditorExtension(host, getEditor, extension) {
	useEffect(host, () => {
		return getEditor()?.use(extension);
	});
}
export { useEditorExtension as t };

//# sourceMappingURL=use-editor-extension.js.map