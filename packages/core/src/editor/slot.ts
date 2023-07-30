export interface Slot<Input, Output> {
  create: (inputs: Input[]) => Output
  update: (inputs: Input[]) => Output | null
}

export type AnySlot = Slot<any, any>
