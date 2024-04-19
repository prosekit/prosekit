export interface ResizableProps {
  width: number | null
  height: number | null
  aspectRatio: number | null
  onSizeChangeStart: ((size: { width: number; height: number }) => void) | null
  onSizeChange: ((size: { width: number; height: number }) => void) | null
  onSizeChangeEnd: ((size: { width: number; height: number }) => void) | null
}

export const defaultResizableProps = {
  width: null,
  height: null,
  aspectRatio: null,
  onSizeChangeStart: null,
  onSizeChange: null,
  onSizeChangeEnd: null,
} satisfies ResizableProps
