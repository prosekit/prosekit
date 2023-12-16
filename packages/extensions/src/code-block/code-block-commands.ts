import { defineCommands } from '@prosekit/core';

/**
 * Adds commands for working with `codeBlock` nodes.
 *
 * @public
 */

export function defineCodeBlockCommands() {
  return defineCommands({
    setCodeBlockLanguage: (language: string) => (state, dispatch) => {
      const pos = state.selection.$from.before();
      const codeBlock = state.doc.nodeAt(pos);
      if (!codeBlock || codeBlock.type.name !== 'codeBlock') {
        return false;
      }
      const { tr } = state;
      tr.setNodeMarkup(pos, undefined, { language });
      dispatch?.(tr);
      return true;
    },
  });
}
