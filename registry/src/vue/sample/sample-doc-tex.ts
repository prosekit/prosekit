import type { NodeJSON } from 'prosekit/core'

const EULER_IDENTITY = String.raw`e^{i\pi} + 1 = 0`

const QUADRATIC_FORMULA = String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`

const GAUSSIAN_INTEGRAL = String.raw`\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}`

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Inline equations' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: "Euler's identity " },
        { type: 'mathInline', content: [{ type: 'text', text: EULER_IDENTITY }] },
        { type: 'text', text: ' and the quadratic formula ' },
        { type: 'mathInline', content: [{ type: 'text', text: QUADRATIC_FORMULA }] },
        { type: 'text', text: ' can appear within text. Type ' },
        { type: 'text', marks: [{ type: 'code' }], text: '$...$' },
        { type: 'text', text: ' to insert an inline equation.' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Block equations' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'The Gaussian integral:' },
      ],
    },
    {
      type: 'mathBlock',
      content: [{ type: 'text', text: GAUSSIAN_INTEGRAL }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Type ' },
        { type: 'text', marks: [{ type: 'code' }], text: '$$' },
        { type: 'text', text: ' in a new line and press Enter to create a block equation.' },
      ],
    },
  ],
}
