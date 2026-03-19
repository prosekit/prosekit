import { useCallback, useState } from 'react'

const ZOOM_STEPS = [25, 50, 75, 100, 125, 150, 200]
const DEFAULT_ZOOM = 50

function getZoomIn(zoom: number) {
  return ZOOM_STEPS.filter(z => z > zoom).sort().at(0) 
}

function getZoomOut(zoom: number) {
  return ZOOM_STEPS.filter(z => z < zoom).sort().at(-1) 
}

export function useZoom() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const zoomIn = useCallback(() => {
    setZoom((z) => getZoomIn(z) ?? z)
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => getZoomOut(z) ?? z)
  }, [])

  const canZoomIn = getZoomIn(zoom) != undefined
  const canZoomOut = getZoomOut(zoom) != undefined

  return { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut }
}
