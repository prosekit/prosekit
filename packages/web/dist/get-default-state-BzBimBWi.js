import { createSignal } from "@aria-ui/core";

//#region src/utils/get-default-state.ts
function getStateWithDefaults(state, props) {
	const merged = { ...state };
	for (const key of Object.keys(props)) if (!merged[key]) merged[key] = createSignal(props[key].default);
	return merged;
}

//#endregion
export { getStateWithDefaults as t };
//# sourceMappingURL=get-default-state-BzBimBWi.js.map