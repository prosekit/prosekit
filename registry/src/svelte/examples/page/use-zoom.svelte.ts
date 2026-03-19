const ZOOM_STEPS = [25, 50, 75, 100, 125, 150, 200]
const DEFAULT_ZOOM = 50

export function useZoom() {
  let zoom = $state(DEFAULT_ZOOM)

  function zoomIn() {
    const next = ZOOM_STEPS.find((s) => s > zoom)
    if (next != null) {
      zoom = next
    }
  }

  function zoomOut() {
    const prev = [...ZOOM_STEPS].reverse().find((s) => s < zoom)
    if (prev != null) {
      zoom = prev
    }
  }

  const canZoomIn = $derived(zoom < ZOOM_STEPS[ZOOM_STEPS.length - 1])
  const canZoomOut = $derived(zoom > ZOOM_STEPS[0])

  return {
    get zoom() { return zoom },
    get canZoomIn() { return canZoomIn },
    get canZoomOut() { return canZoomOut },
    zoomIn,
    zoomOut,
  }
}
