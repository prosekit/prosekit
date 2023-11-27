import { createContext } from '@lit/context'

import type { ListManager } from '../../manager/list-manager'
import type { ComboBoxItem } from '../combo-box-item'

export interface ComboBoxContext {
  inputValue: string
  setInputValue: (val: string) => void
  selectedValue: string
  listManager: ListManager<ComboBoxItem>
}

export const comboBoxContext = createContext<ComboBoxContext>(
  'prosekit-combo-box-context',
)
