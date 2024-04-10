/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { SingalState } from '@aria-ui/core'

export function defineProperties(
  ElementConstructor: new () => { _s: SingalState<any> },
  defaultProps: Record<string, any>,
) {
  for (const prop of Object.keys(defaultProps)) {
    Object.defineProperty(ElementConstructor.prototype, prop, {
      get() {
        return this._s[prop].value
      },
      set(v: any) {
        this._s[prop].value = v
      },
    })
  }
}
