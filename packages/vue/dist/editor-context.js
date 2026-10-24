import { inject, provide } from "vue";
const symbol = Symbol("prosekit-vue-editor-context");
/**
* @internal
*/
function provideEditor(editor) {
	provide(symbol, editor);
}
/**
* @internal
*/
function useEditorContext() {
	return inject(symbol, void 0);
}
export { useEditorContext as n, provideEditor as t };

//# sourceMappingURL=editor-context.js.map