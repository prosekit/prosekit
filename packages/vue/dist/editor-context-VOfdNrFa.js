import { inject, provide } from "vue";

//#region src/injection/editor-context.ts
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

//#endregion
export { useEditorContext as n, provideEditor as t };
//# sourceMappingURL=editor-context-VOfdNrFa.js.map