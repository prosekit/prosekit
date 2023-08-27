import { createContext } from '@lit-labs/context'

import type { ListManager } from '../../manager/list-manager'
import type { ComboBoxItem } from '../combo-box-item'

export type ComboBoxContext = {
  inputValue: string
  setInputValue: (val: string) => void

  selectedValue: string
  setSelectedValue: (val: string) => void

  listManager: ListManager<ComboBoxItem>
}

export const comboBoxContext = createContext<ComboBoxContext>(
  'prosekit-combo-box-context',
)
