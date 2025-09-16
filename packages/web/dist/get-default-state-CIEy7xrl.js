import { createSignal } from "@aria-ui/core";

//#region src/utils/get-default-state.ts
function getStateWithDefaults(state, props) {
	const merged = { ...state };
	for (const key of Object.keys(props)) if (!merged[key]) merged[key] = createSignal(props[key].default);
	return merged;
}

//#endregion
export { getStateWithDefaults };
//# sourceMappingURL=get-default-state-CIEy7xrl.js.map