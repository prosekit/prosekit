import { createContext } from '@lit-labs/context'

export type CommandListContext = {
  scores: Map<string, number>
  selectedValue: string
  registerValue: (value: string) => VoidFunction
}

export const commandListContext = createContext<CommandListContext>(
  'prosekit-command-list-context',
)
