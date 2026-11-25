/**
 * The layout of one top-level node in the paginated document.
 *
 * @internal
 */
export interface ChunkLayout {
  head: boolean
  tail: boolean
  paddingTop: number
  paddingBottom: number
}

/**
 * Computes where each top-level node starts and ends a page.
 *
 * @param heights - The content box height of each top-level node. A missing height counts as zero.
 * @param breaks - Whether each top-level node forces a page break after it.
 *
 * @internal
 */
export function computePageLayout(
  heights: readonly number[],
  breaks: readonly boolean[],
  pageHeight: number,
  marginTop: number,
  marginBottom: number,
): ChunkLayout[] {
  const count = breaks.length
  const layouts: ChunkLayout[] = []
  if (count === 0) return layouts

  const maxContentHeight = pageHeight - marginTop - marginBottom

  let currentContentHeight = 0
  let forceNextBreak = false

  for (let i = 0; i < count; i++) {
    const h = heights[i] ?? 0
    const head = forceNextBreak || i === 0 || currentContentHeight + h > maxContentHeight

    forceNextBreak = breaks[i]

    if (head && i > 0) {
      const prev = layouts[i - 1]
      prev.paddingBottom = Math.max(0, pageHeight - marginTop - currentContentHeight)
      prev.tail = true
      currentContentHeight = h
    } else {
      currentContentHeight += h
    }

    layouts.push({
      head,
      tail: false,
      paddingTop: head ? marginTop : 0,
      paddingBottom: 0,
    })
  }

  const last = layouts[count - 1]
  last.paddingBottom = Math.max(0, pageHeight - marginTop - currentContentHeight)
  last.tail = true

  return layouts
}
