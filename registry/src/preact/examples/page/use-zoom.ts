import { useCallback, useState } from 'preact/hooks'

const ZOOM_STEPS = [25, 50, 75, 100, 125, 150, 200]
const DEFAULT_ZOOM = 50

export function useZoom() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const zoomIn = useCallback(() => {
    setZoom((z) => {
      const next = ZOOM_STEPS.find((s) => s > z)
      return next ?? z
    })
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const prev = [...ZOOM_STEPS].reverse().find((s) => s < z)
      return prev ?? z
    })
  }, [])

  const canZoomIn = zoom < ZOOM_STEPS[ZOOM_STEPS.length - 1]
  const canZoomOut = zoom > ZOOM_STEPS[0]

  return { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut }
}
