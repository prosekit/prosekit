import { registerVanillaRenderer } from 'prosekit-registry/vanilla/renderer'

if (typeof window !== 'undefined') {
  registerVanillaRenderer()
}
