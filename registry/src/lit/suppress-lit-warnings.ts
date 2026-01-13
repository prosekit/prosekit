// Suppress Lit development mode warning
// https://github.com/lit/lit/issues/4877
export function suppressLitWarnings() {
  if (typeof globalThis !== 'undefined') {
    const global = globalThis as { litIssuedWarnings?: Set<string> }
    global.litIssuedWarnings ??= new Set()
    global.litIssuedWarnings.add(
      'dev-mode',
    )
  }
}
