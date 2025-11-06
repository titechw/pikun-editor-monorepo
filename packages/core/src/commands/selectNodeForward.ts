import { selectNodeForward as originalSelectNodeForward } from '@pikun/pm/commands';

import type { RawCommands } from '../types.js';

declare module '@pikun/core' {
  interface Commands<ReturnType> {
    selectNodeForward: {
      /**
       * Select a node forward.
       * @example editor.commands.selectNodeForward()
       */
      selectNodeForward: () => ReturnType;
    };
  }
}

export const selectNodeForward: RawCommands['selectNodeForward'] =
  () =>
  ({ state, dispatch }) => {
    return originalSelectNodeForward(state, dispatch);
  };
