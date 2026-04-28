export const state = {
  imageRefresh: {
    mounted: 0,
    unmounted: 0,
    setAttrs: 0,
  },
}

export function resetState() {
  state.imageRefresh.mounted = 0
  state.imageRefresh.unmounted = 0
  state.imageRefresh.setAttrs = 0
}
