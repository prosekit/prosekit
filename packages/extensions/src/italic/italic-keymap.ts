import { defineKeymap, toggleMark } from "@prosekit/core";

/**
 * @internal
 */
export function defineItalicKeymap() {
  return defineKeymap({
    'Mod-i': toggleMark({ type: 'italic' }),
  });
}
