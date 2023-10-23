export interface Converter<Input = any, Output = any> {
  create: (inputs: Input[]) => Output
  update: (inputs: Input[]) => Output | null
}
