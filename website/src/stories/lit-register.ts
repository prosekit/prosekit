import { registerLitRenderer } from 'prosekit-registry/lit/renderer'

if (typeof window !== 'undefined') {
  registerLitRenderer()
}
