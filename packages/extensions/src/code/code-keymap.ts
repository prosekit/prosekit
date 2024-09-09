import { defineKeymap, toggleMark } from "@prosekit/core";


/**
 * @internal
 */
export function defineCodeKeymap() {
    return defineKeymap({
      'Mod-e': toggleMark({ type: 'code' }),
    })
  }
