const ZOOM_STEPS = [25, 50, 75, 100, 125, 150, 200]
const DEFAULT_ZOOM = 50

function getZoomIn(zoom: number) {
  return ZOOM_STEPS.filter(z => z > zoom).sort().at(0) 
}

function getZoomOut(zoom: number) {
  return ZOOM_STEPS.filter(z => z < zoom).sort().at(-1) 
}

export function useZoom() {
  let zoom = $state(DEFAULT_ZOOM)

  function zoomIn() {
    zoom = getZoomIn(zoom) ?? zoom
  }

  function zoomOut() {
   zoom = getZoomOut(zoom) ?? zoom
  }

  const canZoomIn = $derived(getZoomIn(zoom) != undefined)
  const canZoomOut = $derived(getZoomOut(zoom) != undefined)

  return {
    get zoom() { return zoom },
    get canZoomIn() { return canZoomIn },
    get canZoomOut() { return canZoomOut },
    zoomIn,
    zoomOut,
  }
}
