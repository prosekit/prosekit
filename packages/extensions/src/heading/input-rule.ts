import { defineTextBlockInputRule } from "../input-rule";
import type { HeadingAttrs } from "./types";

/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 */

export function defineHeadingInputRule() {
  return defineTextBlockInputRule({
    regex: /^(#{1,6})\s$/,
    type: 'heading',
    attrs: (match) => {
      const level: number = match[1]?.length ?? 1;
      return { level } satisfies HeadingAttrs;
    },
  });
}
